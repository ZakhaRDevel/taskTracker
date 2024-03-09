import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class CoreService {
    get isBrowser() {
      return isPlatformBrowser(inject(PLATFORM_ID))
    }

    get isMobile(): boolean {
        if (this.isBrowser) {
            return window.innerWidth <= 1280;
        }
        return false;
    }
}
