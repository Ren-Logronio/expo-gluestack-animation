# Gluestack UI Animations

##### Gluestack Animation Components

> Note: No such component as AnimatedLinearGradient, animating gradients from gluestack components might require some complicated workarounds

* AnimatedText,
* AnimatedView,
* AnimatedPressable
* AnimatedImage,
* AnimatedScrollView,
* AnimatedSafeAreaView,
* AnimatedFlatList,
* AnimatedSectionList,
* AnimatePresence ( enables animation to wrapped animation components based on mount and unmount events )

  SVG Related Animation Components
* AnimatedSvg,
* AnimatedRect,
* AnimatedCircle,
* AnimatedEllipse,
* AnimatedLine,
* AnimatedPolyline,
* AnimatedPath,
* AnimatedTSpan,
* AnimatedTextPath,
* AnimatedG,
* AnimatedClipPath,

##### Gluestack Animation Aliases

aliases was intended to be used as generalization of animation props from animation libraries (e.g legendapp motion, framer motion, moti)

> note: currently, only [legendapp motion](https://www.npmjs.com/package/@gluestack-style/legend-motion-animation-driver) is available for their animation, the gluestack team stated that driver for moti is available too but so far no npm package is present indicating that that was factual

| Alias                     | Prop                     | Example Value                                                                                                                                                                                                                                                    | Notes                                                                                                                                                                                                   |
| :------------------------ | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| :animate                  | animate                  | Object { StyleProps }                                                                                                                                                                                                                                           | animation on render                                                                                                                                                                                     |
| :initial                  | initial                  | Object { StyleProps }                                                                                                                                                                                                                                           | initial properties of the component                                                                                                                                                                     |
| :exit                     | exit                     | Object { StyleProps }                                                                                                                                                                                                                                           | - when this prop is present, the unmount event<br />is delayed until the animation to exit props are<br />finished<br /><br />- requires the animated component <br />to be wrapped by AnimatePresence |
| :initialProps             | initialProps             | Object { StyleProps }                                                                                                                                                                                                                                           | similar with initial, can be used for<br />svg, lineargradient, and custom components                                                                                                                   |
| :animateProps             | animateProps             | Object { StyleProps }                                                                                                                                                                                                                                           | similar with animate, can be used for<br />svg, lineargradient, and custom components                                                                                                                   |
| :transition               | transition               | {<br />     x: {<br />          type?: "tween" / "spring" / "linear",<br />         duration?: number,<br />          damping?: number,<br />          stiffness?: number,<br />          timing?: "ms", "s",<br />      }<br />} | transition effects,<br />duration, type, stiffness, damping.                                                                                                                                           |
| :transformOrigin          | transformOrigin          | Object { StyleProps }                                                                                                                                                                                                                                           | defines the original transform values<br />of the component, useful when <br />using scale, xy position, rotation, and other<br />transform animations                                                  |
| ~~:whileTap~~            | ~~whileTap~~            | Object { StyleProps }                                                                                                                                                                                                                                           | animation that triggers while tapping<br /><br />unable to use                                                                                                                                          |
| ~~:whileHover~~          | ~~whileHover~~          | Object { StyleProps }                                                                                                                                                                                                                                           | animation that triggers while<br />the component is hovered<br /><br />unable to use                                                                                                                    |
| ~~:onAnimationComplete~~ | ~~onAnimationComplete~~ | ~~n/a~~                                                                                                                                                                                                                                                         | unable to use                                                                                                                                                                                           |

##### ":animate" / ":animateProps" / animate / animateProps StyleProps

> Note: in cases where animate props are provided outside of gluestack styled() function, the provided values must be from react-native's stylesheet values, and gluestack values like "$0", "\$..", "\$rose500" will also likely not work

| property                                 | type        | Exmple value                                                           | Notes                                                                                                                                                                                               |
| ---------------------------------------- | ----------- | ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| backgroundColor                          | string      | "$amber100",<br />"#000000",<br />"hsl(0, 0%, 0%)"<br />"hwb(0 0% 0%)" | gluestack values (e.g "\$rose500", "$amber200", etc.) <br />will not work if animate prop is outside of styled() function<br />-- use [Stylesheet values]() instead (e.g hex, hsl, hwb)              |
| opacity                                  | number      | 0, 0.75, 1                                                             | ...                                                                                                                                                                                                 |
| x, y                                     | number      | 0, 30, 200                                                             | The starting position (0, 0) always starts at the origin point of the component.<br />the origin point can be changed with [transformOrigin ](#IStyledPluginconfig.aliases)prop                        |
| scale                                    | number      | 0, 1.5, 2                                                              | ...                                                                                                                                                                                                 |
| scaleX                                   | number      | 0, 1.5, 2                                                              | ...                                                                                                                                                                                                 |
| scaleY                                   | number      | 0, 1.5, 2                                                              | ...                                                                                                                                                                                                 |
| rotate                                   | string      | "30deg", "0.78rad"                                                     | <br /><br />The type is number according to gluestack type docs but render error<br />"Transform with the key of 'rotate' must be a string" states otherwise                                        |
| rotateY                                  | string      | "30deg", "0.78rad"                                                     | ...                                                                                                                                                                                                 |
| rotateZ                                  | string      | "30deg", "0.78rad"                                                     | ...                                                                                                                                                                                                 |
| ~~skewX~~                               | ~~number~~ | n/a                                                                    | The type is number but render error<br />"Transform with the key of 'rotate' must be a string" states otherwise<br /><br />string value "0deg" and "0rad" are also invalid<br /><br />unable to use |
| ~~skewY~~                               | ~~number~~ | n/a                                                                    | The type is number but render error<br />"Transform with the key of 'rotate' must be a string" states otherwise<br /><br />string value "0deg" and "0rad" are also invalid<br /><br />unable to use |
| matrix                                   | number[]    | [0, 0, ...]                                                            | transform matrix                                                                                                                                                                                    |
| width                                    | number      | 1, 200                                                                 | component expands rightward                                                                                                                                                                         |
| height                                   | number      | 1, 200                                                                 | component expands downward                                                                                                                                                                          |
| padding (p, px, py,<br />pt, pb, pr, pl) | string      | "$0", "$3", "$12"                                                    | ...                                                                                                                                                                                                 |
| margin (mx, my,<br />mt, mb, mr, ml)     | string      | "$0", "$3", "$12"                                                    | ...                                                                                                                                                                                                 |
