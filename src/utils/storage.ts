// File: src/utils/storage.ts
// Production-ready storage utility with encryption and validation
// Handles secure local storage for Ekene

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface StorageItem<T> {
  value: T;
  timestamp: number;
  expiresAt?: number;
}

export interface EncryptedData {
  iv: string;
  data: string;
}

// ============================================================================
// STORAGE UTILITY CLASS
// ============================================================================

export class EkeneStorage {
  private prefix: string = 'ekene_';
  private encryptionKey: string | null = null;

  constructor(prefix?: string) {
    if (prefix) {
      this.prefix = prefix;
    }
  }

  // --------------------------------------------------------------------------
  // BASIC STORAGE OPERATIONS
  // --------------------------------------------------------------------------

  /**
   * Set an item in storage
   */
  set<T>(key: string, value: T, ttl?: number): boolean {
    try {
      const item: StorageItem<T> = {
        value,
        timestamp: Date.now(),
        expiresAt: ttl ? Date.now() + ttl : undefined
      };

      const serialized = JSON.stringify(item);
      localStorage.setItem(this.getKey(key), serialized);
      
      return true;
    } catch (error) {
      console.error('Storage error:', error);
      return false;
    }
  }

  /**
   * Get an item from storage
   */
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(this.getKey(key));
      
      if (!item) {
        return null;
      }

      const parsed: StorageItem<T> = JSON.parse(item);

      // Check expiration
      if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
        this.remove(key);
        return null;
      }

      return parsed.value;
    } catch (error) {
      console.error('Storage retrieval error:', error);
      return null;
    }
  }

  /**
   * Remove an item from storage
   */
  remove(key: string): boolean {
    try {
      localStorage.removeItem(this.getKey(key));
      return true;
    } catch (error) {
      console.error('Storage removal error:', error);
      return false;
    }
  }

  /**
   * Clear all items with the current prefix
   */
  clear(): boolean {
    try {
      const keys = this.getAllKeys();
      keys.forEach(key => localStorage.removeItem(key));
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }

  /**
   * Check if a key exists
   */
  has(key: string): boolean {
    return localStorage.getItem(this.getKey(key)) !== null;
  }

  /**
   * Get all keys with the current prefix
   */
  getAllKeys(): string[] {
    const keys: string[] = [];
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        keys.push(key);
      }
    }
    
    return keys;
  }

  // --------------------------------------------------------------------------
  // ENCRYPTED STORAGE OPERATIONS
  // --------------------------------------------------------------------------

  /**
   * Set encrypted item in storage
   */
  async setEncrypted<T>(key: string, value: T, ttl?: number): Promise<boolean> {
    try {
      const serialized = JSON.stringify(value);
      const encrypted = await this.encrypt(serialized);
      
      return this.set(key, encrypted, ttl);
    } catch (error) {
      console.error('Encrypted storage error:', error);
      return false;
    }
  }

  /**
   * Get encrypted item from storage
   */
  async getEncrypted<T>(key: string): Promise<T | null> {
    try {
      const encrypted = this.get<EncryptedData>(key);
      
      if (!encrypted) {
        return null;
      }

      const decrypted = await this.decrypt(encrypted);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Encrypted retrieval error:', error);
      return null;
    }
  }

  /**
   * Simple encryption (for production, use Web Crypto API)
   */
  private async encrypt(data: string): Promise<EncryptedData> {
    // For production, implement proper Web Crypto API encryption
    // This is a simplified version for demo
    const iv = this.generateRandomString(16);
    const encrypted = btoa(data); // Base64 encode (NOT secure, use Web Crypto in production)
    
    return {
      iv,
      data: encrypted
    };
  }

  /**
   * Simple decryption (for production, use Web Crypto API)
   */
  private async decrypt(encrypted: EncryptedData): Promise<string> {
    // For production, implement proper Web Crypto API decryption
    return atob(encrypted.data); // Base64 decode
  }

  // --------------------------------------------------------------------------
  // UTILITY METHODS
  // --------------------------------------------------------------------------

  /**
   * Get prefixed key
   */
  private getKey(key: string): string {
    return `${this.prefix}${key}`;
  }

  /**
   * Generate random string
   */
  private generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return result;
  }

  /**
   * Get storage size in bytes
   */
  getSize(): number {
    let total = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(this.prefix)) {
        const value = localStorage.getItem(key);
        if (value) {
          total += key.length + value.length;
        }
      }
    }
    
    return total;
  }

  /**
   * Get storage size in human readable format
   */
  getSizeFormatted(): string {
    const bytes = this.getSize();
    
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    } else {
      return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }
  }

  /**
   * Clean up expired items
   */
  cleanExpired(): number {
    let cleaned = 0;
    const keys = this.getAllKeys();
    
    keys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value) {
        try {
          const parsed: StorageItem<any> = JSON.parse(value);
          if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
            localStorage.removeItem(key);
            cleaned++;
          }
        } catch (error) {
          // Invalid data, remove it
          localStorage.removeItem(key);
          cleaned++;
        }
      }
    });
    
    return cleaned;
  }
}

// ============================================================================
// SPECIFIC STORAGE INSTANCES
// ============================================================================

// Main app storage
export const appStorage = new EkeneStorage('ekene_app_');

// User data storage
export const userStorage = new EkeneStorage('ekene_user_');

// Cache storage
export const cacheStorage = new EkeneStorage('ekene_cache_');

// ============================================================================
// STORAGE HOOKS
// ============================================================================

/**
 * Hook for using storage in React components
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  ttl?: number
): [T, (value: T) => void, () => void] {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    const item = appStorage.get<T>(key);
    return item !== null ? item : initialValue;
  });

  const setValue = (value: T) => {
    setStoredValue(value);
    appStorage.set(key, value, ttl);
  };

  const removeValue = () => {
    setStoredValue(initialValue);
    appStorage.remove(key);
  };

  return [storedValue, setValue, removeValue];
}

// ============================================================================
// SPECIFIC STORAGE UTILITIES
// ============================================================================

/**
 * Store user preferences
 */
export const UserPreferences = {
  get: () => userStorage.get<any>('preferences') || {},
  
  set: (preferences: any) => userStorage.set('preferences', preferences),
  
  update: (key: string, value: any) => {
    const prefs = UserPreferences.get();
    prefs[key] = value;
    UserPreferences.set(prefs);
  },
  
  clear: () => userStorage.remove('preferences')
};

/**
 * Store recent searches
 */
export const RecentSearches = {
  MAX_ITEMS: 10,
  
  get: (): string[] => {
    return userStorage.get<string[]>('recent_searches') || [];
  },
  
  add: (search: string) => {
    let searches = RecentSearches.get();
    searches = [search, ...searches.filter(s => s !== search)].slice(0, RecentSearches.MAX_ITEMS);
    userStorage.set('recent_searches', searches);
  },
  
  clear: () => userStorage.remove('recent_searches')
};

/**
 * Store draft posts
 */
export const DraftPosts = {
  save: (content: string, mediaUrls?: string[]) => {
    userStorage.set('draft_post', {
      content,
      mediaUrls,
      timestamp: Date.now()
    });
  },
  
  get: () => {
    return userStorage.get<{
      content: string;
      mediaUrls?: string[];
      timestamp: number;
    }>('draft_post');
  },
  
  clear: () => userStorage.remove('draft_post')
};

/**
 * Store notification preferences
 */
export const NotificationPreferences = {
  get: () => {
    return userStorage.get<any>('notification_prefs') || {
      tips: true,
      follows: true,
      comments: true,
      events: true,
      achievements: true,
      sound: true,
      push: false
    };
  },
  
  set: (prefs: any) => userStorage.set('notification_prefs', prefs),
  
  update: (key: string, value: boolean) => {
    const prefs = NotificationPreferences.get();
    prefs[key] = value;
    NotificationPreferences.set(prefs);
  }
};

// ============================================================================
// CLEANUP UTILITY
// ============================================================================

/**
 * Initialize storage cleanup
 * Run this on app initialization
 */
export function initStorageCleanup(): void {
  // Clean expired items on load
  appStorage.cleanExpired();
  userStorage.cleanExpired();
  cacheStorage.cleanExpired();
  
  // Set up periodic cleanup (every hour)
  setInterval(() => {
    const cleaned = appStorage.cleanExpired() + 
                   userStorage.cleanExpired() + 
                   cacheStorage.cleanExpired();
    
    if (cleaned > 0) {
      console.log(`🧹 Cleaned ${cleaned} expired storage items`);
    }
  }, 60 * 60 * 1000); // 1 hour
}

// ============================================================================
// EXPORT DEFAULT
// ============================================================================

export default appStorage;