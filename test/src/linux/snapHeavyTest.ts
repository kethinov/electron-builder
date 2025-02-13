import { Platform, Arch } from "app-builder-lib"
import { app, snapTarget } from "../helpers/packTester"

// very slow

if (process.env.SNAP_HEAVY_TEST !== "true") {
  fit("Skip snapHeavyTest suite — SNAP_HEAVY_TEST is not set to true", () => {
    console.warn("[SKIP] Skip snapTest suite — SNAP_HEAVY_TEST is not set to true")
  })
}

test.ifAll(
  "snap full",
  app({
    targets: snapTarget,
    config: {
      extraMetadata: {
        name: "se-wo-template",
      },
      productName: "Snap Electron App (full build)",
      snap: {
        useTemplateApp: false,
      },
      electronFuses: {
        runAsNode: true,
        enableCookieEncryption: true,
        enableNodeOptionsEnvironmentVariable: true,
        enableNodeCliInspectArguments: true,
        enableEmbeddedAsarIntegrityValidation: true,
        onlyLoadAppFromAsar: true,
        loadBrowserProcessSpecificV8Snapshot: true,
        grantFileProtocolExtraPrivileges: undefined, // unsupported on current electron version in our tests
      },
    },
  })
)

// very slow
test.ifAll(
  "snap full (armhf)",
  app({
    targets: Platform.LINUX.createTarget("snap", Arch.armv7l),
    config: {
      extraMetadata: {
        name: "se-wo-template",
      },
      productName: "Snap Electron App (full build)",
      snap: {
        useTemplateApp: false,
      },
    },
  })
)
