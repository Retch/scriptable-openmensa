const autoUpdate = true;
const mensaId = "148";

function getOpenMensaApi(id) {
    return "https://openmensa.org/api/v2/canteens/" + id + "/meals";
}

const widget = await createWidget();
if (!config.runsInWidget) {
  await widget.presentMedium();
}
Script.setWidget(widget);
Script.complete();

async function createWidget() {
  const data = await getData();

  const list = new ListWidget();
  list.addSpacer();

  const header = list.addText("🍽️ Mensa");
  header.font = Font.mediumSystemFont(13);

  list.addSpacer(12);

  if (data) {
    today = data[0];

    today.meals.map((meal) => {
      const label = list.addText(meal.prices.students + " € - " + meal.name);
      label.font = Font.mediumSystemFont(10);
    })

  } else {
    list.addText("Daten nicht verfügbar");
  }

  list.addSpacer();

  return list;
}

async function getData() {
  try {
    let data = await new Request(getOpenMensaApi(mensaId)).loadJSON();
    return data;
  } catch (e) {
    return null;
  }
}
