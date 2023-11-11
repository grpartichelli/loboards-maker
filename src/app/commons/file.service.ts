import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class FileService {
  public downloadTxt(text: string, name: string) {
    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(text),
    );
    element.setAttribute("download", name);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  public readTextFile(event: any): File | null {
    const file = this.readFile(event);
    if (file?.type.match(/text\/plain\/*/) == null) {
      return null;
    }
    return file;
  }

  private readFile(event: any): File | null {
    const files = event.target.files;
    if (event.target.files === 0) {
      return null;
    }
    return files[0];
  }

  public readImageFile(event: any): File | null {
    const file = this.readFile(event);
    if (file?.type.match(/image\/*/) == null) {
      return null;
    }
    return file;
  }
}
