// Main execution point for setting up the widget
async function setupWidget() {
  let widget = await createWidget();

  // Check the context of script execution and present the widget accordingly
  if (config.runsInWidget) {
    // If running as a widget, set the widget on the home screen
    Script.setWidget(widget);
  } else {
    // If running in the app, display the widget in a small size
    widget.presentSmall();
  }

  // Signal that the script has completed all tasks
  Script.complete();
}

// Creates the main widget with heading and next launch information
async function createWidget() {
  // Initial setup
  const listWidget = new ListWidget();
  listWidget.backgroundColor = new Color('#000000');

  // Fetch data
  const { buy, sell, date } = await fetchUSDValue();
  listWidget.setPadding(10, 10, 10, 10);
  // Add texts
  addHeading(listWidget, '🇦🇷 Dólar Blue 💵');
  listWidget.addSpacer(10);
  addPrimaryTextLight(listWidget, `Compra`);
  addPrimaryTextSemiBold(listWidget, `${buy} ARS`);
  listWidget.addSpacer(5);
  addPrimaryTextLight(listWidget, `Venta`);
  addPrimaryTextSemiBold(listWidget, `${sell} ARS`);
  listWidget.addSpacer(10);
  addSecondaryText(listWidget, `Última actualización: ${date}`);

  return listWidget;
}

// Fetches the USD value from the API
async function fetchUSDValue() {
  const API_URL = 'https://dolarhoy.com/i/cotizaciones/dolar-blue';
  const request = new Request(API_URL);
  const response = await request.loadString();
  const buy = response.match(/<p>(\d+\.\d+)<span>Compra<\/span><\/p>/)?.[1];
  const sell = response.match(/<p>(\d+\.\d+)<span>Venta<\/span><\/p>/)?.[1];
  return { buy, sell, date: new Date().toLocaleTimeString() };
}

// Adds a text to the widget
function addPrimaryTextSemiBold(widget: ListWidget, text: string) {
  const textElement = widget.addText(text);
  textElement.centerAlignText();
  textElement.font = Font.semiboldSystemFont(16);
  textElement.textColor = new Color('#ffffff');
}

function addPrimaryTextLight(widget: ListWidget, text: string) {
  const textElement = widget.addText(text);
  textElement.centerAlignText();
  textElement.font = Font.lightSystemFont(10);
  textElement.textColor = new Color('#ffffff');
}

// Adds a text to the widget
function addSecondaryText(widget: ListWidget, text: string) {
  const textElement = widget.addText(text);
  textElement.centerAlignText();
  textElement.font = Font.lightSystemFont(8);
  textElement.textColor = new Color('#ffffff');
  textElement.textOpacity = 0.7;
}

// Adds a heading to the widget
function addHeading(widget: ListWidget, text: string) {
  const textElement = widget.addText(text);
  textElement.centerAlignText();
  textElement.font = Font.boldSystemFont(14);
  textElement.textColor = new Color('#ffffff');
}

// Start the widget setup
setupWidget();
