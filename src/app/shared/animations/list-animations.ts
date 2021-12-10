import {
  animation,
  style,
  animate,
  stagger,
  query,
  trigger,
  transition,
  useAnimation,
  group,
  keyframes,
  state
} from "@angular/animations";
import {
  bounce,
  bounceIn,
  bounceOut,
  pulse,
  fadeOut,
  fadeIn,
  slideInUp,
  slideInDown,
  slideOutDown,
  slideOutUp
} from "ng-animate";

export enum AnimationTimings {
  ENTERING = '225ms',
  CURVE = 'cubic-bezier(0.0, 0.0, 0.2, 1)'
}

export const Animations = {
  slideInLeft: trigger('slideInLeft',
    [
      state('void',
        style({
          transform: 'translate3d(-100%, 0, 0)'
        })
      ),

      state('*',
        style({
          transform: 'translate3d(0, 0, 0)'
        })
      ),

      // Prevent the transition if the state is false
      transition('void => false', []),

      // Transition
      transition('void => *', animate('{{timings}}'),
        {
          params: {
            timings: `${AnimationTimings.ENTERING} ${AnimationTimings.CURVE}`,
          }
        }
      )
    ])
}
