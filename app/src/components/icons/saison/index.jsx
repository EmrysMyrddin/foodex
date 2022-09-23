import { ReactComponent as FallDisableIcon } from "./fall_disable.svg"
import { ReactComponent as FallEnableIcon } from "./fall_enable.svg"
import { ReactComponent as SpringDisableIcon } from "./spring_disable.svg"
import { ReactComponent as SpringEnableIcon } from "./spring_enable.svg"
import { ReactComponent as SummerDisableIcon } from "./summer_disable.svg"
import { ReactComponent as SummerEnableIcon } from "./summer_enable.svg"
import { ReactComponent as WinterDisableIcon } from "./winter_disable.svg"
import { ReactComponent as WinterEnableIcon } from "./winter_enable.svg"

import "./index.css"

function saison(spring, summer, fall, winter) {
  const spring_icon = spring ? <SpringEnableIcon /> : <SpringDisableIcon />
  const summer_icon = summer ? <SummerEnableIcon /> : <SummerDisableIcon />
  const fall_icon = fall ? <FallEnableIcon /> : <FallDisableIcon />
  const winter_icon = winter ? <WinterEnableIcon /> : <WinterDisableIcon />

  return (
    <div className="saison-icon text-xs">
      <div className="spring-icon">{spring_icon}</div>
      <div className="summer-icon">{summer_icon}</div>
      <div className="fall-icon">{fall_icon}</div>
      <div className="winter-icon">{winter_icon}</div>
    </div>
  )
}

export { saison }
