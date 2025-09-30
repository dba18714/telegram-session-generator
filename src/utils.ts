import * as readline from 'readline';

/**
 * Utility functions for CLI interactions
 */
export class CLIUtils {
  private static rl: readline.Interface | null = null;

  /**
   * Initialize readline interface
   */
  static initReadline(): void {
    if (!this.rl) {
      this.rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
    }
  }

  /**
   * Close readline interface
   */
  static closeReadline(): void {
    if (this.rl) {
      this.rl.close();
      this.rl = null;
    }
  }

  /**
   * Prompt user for input
   */
  static question(prompt: string): Promise<string> {
    this.initReadline();
    return new Promise(resolve => {
      this.rl!.question(prompt, answer => {
        resolve(answer.trim());
      });
    });
  }

  /**
   * Display formatted message
   */
  static log(message: string, type: 'info' | 'success' | 'error' | 'warning' = 'info'): void {
    const icons = {
      info: '📋',
      success: '✅',
      error: '❌',
      warning: '⚠️',
    };

    console.log(`${icons[type]} ${message}`);
  }

  /**
   * Display separator line
   */
  static separator(): void {
    console.log('────────────────────────────────────────');
  }

  /**
   * Clear console
   */
  static clear(): void {
    console.clear();
  }

  /**
   * Display header
   */
  static header(title: string): void {
    console.log(`\n🔐 ${title}\n`);
  }
}
