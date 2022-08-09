import * as icons from "../components/icons"

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function toIcon(text) {
  if (text === "egg") {
    return <icons.EggIcon />
  } else if (text === "fish") {
    return <icons.FishIcon />
  } else if (text === "fruit") {
    return <icons.FruitIcon />
  } else if (text === "meat") {
    return <icons.MeatIcon />
  } else if (text === "dairy product") {
    return <icons.MilkIcon />
  } else if (text === "vegetable") {
    return <icons.VegetableIcon />
  } else if (text === "crustacean") {
    return <icons.CrustaceanIcon />
  } else if (text === "summer") {
    return <icons.SummerIcon />
  } else if (text === "fall") {
    return <icons.FallIcon />
  } else if (text === "spring") {
    return <icons.SpringIcon />
  } else if (text === "winter") {
    return <icons.WinterIcon />
  } else if (text === "all-year") {
    return <icons.SaisonIcon />
  }

  return <></>
}

export { capitalizeFirstLetter, toIcon }
