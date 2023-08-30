

 function openWindow(
    url: string,
    opt?: {
      target?: string;
      noopener?: boolean;
      noreferrer?: boolean;
    }
  ): void {
    const { target = "__blank", noopener = true, noreferrer = true } = opt || {};
    const feature: string[] = [];
  
    noopener && feature.push("noopener=yes");
    noreferrer && feature.push("noreferrer=yes");
  
    window.open(url, target, feature.join(","));
  }

  export default openWindow;