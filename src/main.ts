import { dialog } from "electron";
import Application from "./main/application";

// TODO: Submit these to a service like opbeat instead.
process.on("uncaughtException", (error) => {
  dialog.showErrorBox("Uncaught exception", `${error.message}: ${error.stack}`);
});

const isProduction = process.env.NODE_ENV === "production";

// Make node understand the source-maps emitted from WebPack.
if (!isProduction) {
  // We must require this the old fasioned way, as this is a dev dependency that might
  // not be available when the packaged application is shipped, and import statements cannot
  // be used in a block like this.
  // tslint:disable-next-line:no-var-requires
  require("source-map-support").install();
}

Application.sharedApplication.run();

// Look for changes to application
if (module.hot) {
  module.hot.accept("./main/application", () => {
    const NewApplication = require("./main/application").default;
    NewApplication.sharedApplication.run();
  });
} else if (!isProduction) {
  // tslint:disable-next-line:no-console
  console.warn("Hot module replacement was disabled");
}
