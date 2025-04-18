
//Initially -> To include ghpages cli into this angular project
npm install -g angular-cli-ghpages
npm install --save-dev angular-cli-ghpages


//For generating the prod build -> dist file
ng build --configuration production --base-href /qr-code-redirect/

//To push the dist file to git for hosting.
ngh --dir=dist/qr-code-redirect/browser