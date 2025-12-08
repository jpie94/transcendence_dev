export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export class FileValidator {
  private allowedExtensions: string[];

  constructor() {
    // this.allowedExtensions = ['.jpg', '.jpeg', '.png', '.pdf', '.txt'];
    this.allowedExtensions = ['.jpg', '.jpeg', '.png'];
  }

  validateFile(filename: string): ValidationResult {
    const result: ValidationResult = { valid: true, errors: [] };

    // Check filename exists
    if (!filename || filename.trim() === '') {
      result.valid = false;
      result.errors.push('No filename provided');
      return result;
    }

    // Check file extension
    const ext: string = filename.toLowerCase().substring(filename.lastIndexOf('.'));
    
    if (!this.allowedExtensions.includes(ext)) {
      result.valid = false;
      result.errors.push(`File extension '${ext}' not allowed. Allowed: ${this.allowedExtensions.join(', ')}`);
    }

    return result;
  }
}
