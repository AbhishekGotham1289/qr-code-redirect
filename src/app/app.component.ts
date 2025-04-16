// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.component.html',
//   styleUrl: './app.component.scss'
// })
// export class AppComponent {
//   title = 'qr-code-redirect';
// }


import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  // imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  googlePlayLink = 'https://play.google.com/store/apps/details?id=your.app.id'; // Replace with actual Google Play link
  appleStoreLink = 'https://www.apple.com/app-store/'; // Replace with actual App Store link
  webLink = 'https://yourwebsite.com'; // Replace with fallback website link

  ngOnInit() {
    this.redirectBasedOnDevice();
  }

  redirectBasedOnDevice(): void {
    const userAgent = navigator.userAgent || navigator.vendor;

    // Check if the device is iOS
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      window.location.href = this.appleStoreLink;
    }
    // Check if the device is Android
    else if (/android/i.test(userAgent)) {
      window.location.href = this.googlePlayLink;
    }
    // Handle desktop or unsupported devices
    else {
      this.openDialog();
    }
  }

  openDialog(): void {
    const dialog = document.getElementById('platform-dialog');
    if (dialog) {
      dialog.style.display = 'flex';
      document.body.classList.add('no-scroll');
    }
  }

  closeDialog(): void {
    const dialog = document.getElementById('platform-dialog');
    if (dialog) {
      dialog.style.display = 'none';
      document.body.classList.remove('no-scroll');
      window.location.href = this.webLink;
    }
  }

  redirectToLink(link: string): void {
    window.location.href = link;
  }
}