import * as icons from "../components/icons"

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function toIcon(text) {
  if (text === "egg") {
    return <icons.EggIcon className="text-3xl" />
  } else if (text === "fish") {
    return <icons.FishIcon className="text-3xl" />
  } else if (text === "fruit") {
    return <icons.FruitIcon className="text-3xl" />
  } else if (text === "meat") {
    return <icons.MeatIcon className="text-3xl" />
  } else if (text === "dairy product") {
    return <icons.MilkIcon className="text-3xl" />
  } else if (text === "vegetable") {
    return <icons.VegetableIcon className="text-3xl" />
  } else if (text === "crustacean") {
    return <icons.CrustaceanIcon className="text-3xl" />
  } else if (text === "summer") {
    return <icons.SummerIcon className="text-3xl" />
  } else if (text === "fall") {
    return <icons.FallIcon className="text-3xl" />
  } else if (text === "spring") {
    return <icons.SpringIcon className="text-3xl" />
  } else if (text === "winter") {
    return <icons.WinterIcon className="text-3xl" />
  } else if (text === "all-year") {
    return <icons.SaisonIcon className="text-3xl" />
  }

  return <></>
}

export { capitalizeFirstLetter, toIcon }
