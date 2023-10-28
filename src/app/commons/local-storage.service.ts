import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  public saveData(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  public getData<T>(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item == null) {
      return item;
    }
    return JSON.parse(item);
  }

  public saveImage(key: string, img: HTMLImageElement) {
    const canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL("image/png");
    localStorage.setItem(
      key,
      dataURL.replace(/^data:image\/(png|jpg);base64,/, ""),
    );
    canvas.remove();
  }

  public getImage(key: string): HTMLImageElement | null {
    const dataURL = localStorage.getItem(key);
    if (dataURL == null) {
      return null;
    }
    const img = new Image();
    img.src = "data:image/png;base64," + dataURL;
    return img;
  }

  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
}
