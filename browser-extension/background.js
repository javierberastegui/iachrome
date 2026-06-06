// Service worker para habilitar la apertura del panel lateral al hacer clic en el icono

chrome.runtime.onInstalled.addListener(() => {
  // Configura la extensión para que abra el panel lateral al hacer clic en el icono
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true })
      .catch((error) => console.error("Error configurando comportamiento del panel lateral:", error));
  }
});
