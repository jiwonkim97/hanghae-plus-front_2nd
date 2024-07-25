module.exports = {
  ci: {
    collect: {
      startServerCommand: "pnpm -F assignment-6 start",
      url: ["http://localhost:8080"],
      numberOfRuns: 5,
      settings: {
        preset: "desktop",
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./lhci_reports",
      reportFilenamePattern: "%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%",
    },
  },
};