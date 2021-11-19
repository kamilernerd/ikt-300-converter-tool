export default class FileLoader {
  private filePath: string;

  constructor(path: string) {
    this.filePath = path;
  }

  private exists(path: string): boolean {
    if (!path) {
      new Error("Invalid parameter value!");
    }

    try {
      Deno.stat(path);
      return true;
    } catch (error) {
      if (error instanceof Deno.errors.NotFound) {
        // file or directory does not exist
        return false;
      } else {
        // unexpected error, maybe permissions, pass it along
        throw error;
      }
    }
  }

  public readFile(): string | null {
    if (this.exists(this.filePath)) {
      return Deno.readTextFileSync(this.filePath);
    }
    return null;
  }

  public writeFile(data: string): void {
    if (!data) {
      new Error("Invalid parameter value!");
    }

    return Deno.writeTextFileSync(this.filePath, data);
  }
}
