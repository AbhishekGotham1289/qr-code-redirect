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
import QRCode from 'qrcode'; // Install via npm: npm install qrcode

@Component({
  selector: 'app-root',
  // imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  googlePlayLink = "https://play.google.com/store/apps/details?id=com.KTERN.KTERN_mobileapplication&pcampaignid=web_share"; // Replace with actual Google Play link
  appleStoreLink = "https://apps.apple.com/in/app/ktern-ai/id6673897527"; // Replace with actual App Store link
  webLink = "https://demo.ktern.com/#/auth/login"; // Replace with fallback website link
  qrCodeUrl: string = '';
  showQrCode: boolean = false;
  isDialogOpen: boolean = true; // Controls dialog visibility

  ngOnInit() {
    // console.log("At ng oninit");
    // // Get the current URL
    // const currentUrl = window.location.href;
    // console.log("current url:",currentUrl);
    // // Generate QR code for the current URL
    // QRCode.toDataURL(currentUrl, { width: 150, margin: 1 }, (err, url) => {
    //   if (err) {
    //     console.error('Error generating QR code:', err);
    //     return;
    //   }
    //   this.qrCodeUrl = url; // Set the QR code image source
    // });
    // console.log("qrCodeUrl:",this.qrCodeUrl);
    document.body.classList.add('no-scroll');
    this.redirectBasedOnDevice();
  }

  ngOnDestroy() {
    // Remove no-scroll when component is destroyed
    document.body.classList.remove('no-scroll');
  }

  handleQrCode() {
    const currentUrl = window.location.href;
    console.log('Generating QR code for URL:', currentUrl); // Debug log

    QRCode.toDataURL(currentUrl, { width: 150, margin: 1 }, (err, url) => {
      if (err) {
        console.error('Error generating QR code:', err);
        return;
      }
      console.log('QR code generated:', url); // Debug log

      // Download the QR code
      const link = document.createElement('a');
      link.href = url;
      link.download = 'KT-QR.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Display QR code in a new window
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>KTern.AI - QR</title>
            <style>
              body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                background-color: #f0f0f0;
              }
              img {
                width: 400;
                height: 350px;
                border: 2px solid #ddd;
                border-radius: 8px;
              }
            </style>
          </head>
          <body>
            <img src="${url}" alt="KT-QR" />
          </body>
          </html>
        `);
        newWindow.document.close();
      } else {
        console.error('Failed to open new window. Ensure pop-ups are allowed.');
      }
    });
  }
  toggleQrCode() {
    this.showQrCode = !this.showQrCode;
    console.log("showQrCode:",this.showQrCode);
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
      // window.location.href = this.webLink;
      window.open(this.webLink, '_blank'); // Open website in new tab
    }
  }

  redirectToLink(link: string): void {
    // window.location.href = link;
    window.open(link, '_blank'); // Open link in new tab
  }
}