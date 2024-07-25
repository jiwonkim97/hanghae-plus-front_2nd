module.exports = {
  ci: {
    collect: {
      startServerCommand: "pnpm -F assignment-6 start",
      url: ["http://localhost:3000"],
      numberOfRuns: 5,
    },
    upload: {
      target: "filesystem",
      outputDir: "./lhci_reports",
      reportFilenamePattern: "%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%",
    },
  },
};