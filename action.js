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

  if (data) {
    const today = data[0];
    const date = today.date.split("-");

    const header = list.addText("🍽️ Mensa " + date[2] + "." + date[1] + "." + date[0]);
    header.font = Font.mediumSystemFont(13);
    list.addSpacer(8);

    today.meals.map((meal) => {
      let price = meal.prices.students.toString();
      if (price.length == 3) {
        price = price + "0";
      }
      const label = list.addText(price + " € - " + meal.name);
      label.font = Font.mediumSystemFont(11);
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
