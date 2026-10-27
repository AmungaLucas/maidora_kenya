/**
 * Maidora line-icon set — hand-drawn 24x24 strokes on react-native-svg.
 * No icon dependency; matches the brand's soft, round geometry.
 */
import React from 'react';
import Svg, { Path, G, Circle, Rect, Line } from 'react-native-svg';
import { colors } from '../../theme/theme';

export type IconName =
  | 'home'
  | 'search'
  | 'chat'
  | 'wallet'
  | 'person'
  | 'users'
  | 'check'
  | 'chevronLeft'
  | 'chevronRight'
  | 'shield'
  | 'bolt'
  | 'phone'
  | 'eye'
  | 'close'
  | 'plus'
  | 'bell'
  | 'star'
  | 'doc'
  | 'lock'
  | 'send'
  | 'pin'
  | 'briefcase';

function content(name: IconName): React.ReactNode {
  switch (name) {
    case 'home':
      return (
        <>
          <Path d="M3 11 12 3l9 8" />
          <Path d="M5.5 9.8V20a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V9.8" />
          <Path d="M10 21v-6h4v6" />
        </>
      );
    case 'search':
      return (
        <>
          <Circle cx={11} cy={11} r={7} />
          <Line x1={16.5} y1={16.5} x2={21} y2={21} />
        </>
      );
    case 'chat':
      return <Path d="M4.5 4.5h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4.5 4V5.5a1 1 0 0 1 1-1Z" />;
    case 'wallet':
      return (
        <>
          <Rect x={3} y={6} width={18} height={13} rx={3} />
          <Path d="M3 10h18" />
          <Circle cx={16.8} cy={14.5} r={0.6} />
        </>
      );
    case 'person':
      return (
        <>
          <Circle cx={12} cy={8} r={4} />
          <Path d="M4 21c1.6-3.8 4.4-5.6 8-5.6s6.4 1.8 8 5.6" />
        </>
      );
    case 'users':
      return (
        <>
          <Circle cx={9} cy={8.5} r={3.5} />
          <Path d="M2.5 20c1.4-3.2 3.8-4.8 6.5-4.8s5.1 1.6 6.5 4.8" />
          <Path d="M16 5.4a3.5 3.5 0 0 1 0 6.2" />
          <Path d="M18.5 15.6c1.6.7 2.6 2.2 3 4.4" />
        </>
      );
    case 'check':
      return <Path d="M5 13l4 4L19 7" />;
    case 'chevronLeft':
      return <Path d="M15 5l-7 7 7 7" />;
    case 'chevronRight':
      return <Path d="M9 5l7 7-7 7" />;
    case 'shield':
      return (
        <>
          <Path d="M12 3l7 2.8v5.4c0 4.6-2.9 7.6-7 9.3-4.1-1.7-7-4.7-7-9.3V5.8L12 3Z" />
          <Path d="M9 12l2.2 2.2L15.5 9.8" />
        </>
      );
    case 'bolt':
      return <Path d="M13 2 5 13.5h6L10 22l8-11.5h-6L13 2Z" />;
    case 'phone':
      return (
        <>
          <Rect x={7} y={2.5} width={10} height={19} rx={3} />
          <Line x1={10.5} y1={18.2} x2={13.5} y2={18.2} />
        </>
      );
    case 'eye':
      return (
        <>
          <Path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
          <Circle cx={12} cy={12} r={3} />
        </>
      );
    case 'close':
      return <Path d="M6.5 6.5l11 11M17.5 6.5l-11 11" />;
    case 'plus':
      return <Path d="M12 5v14M5 12h14" />;
    case 'bell':
      return (
        <>
          <Path d="M18 16H6c1.5-1.6 2-3.4 2-6.5a4 4 0 1 1 8 0c0 3.1.5 4.9 2 6.5Z" />
          <Path d="M10 19.5a2 2 0 0 0 4 0" />
        </>
      );
    case 'star':
      return (
        <Path d="M12 3.5l2.6 5.3 5.9.9-4.2 4.1 1 5.8L12 16.9l-5.3 2.7 1-5.8-4.2-4.1 5.9-.9L12 3.5Z" />
      );
    case 'doc':
      return (
        <>
          <Path d="M7 3h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
          <Path d="M14 3v4h4" />
          <Line x1={9} y1={12} x2={15} y2={12} />
          <Line x1={9} y1={15.5} x2={15} y2={15.5} />
        </>
      );
    case 'lock':
      return (
        <>
          <Rect x={5} y={11} width={14} height={9.5} rx={2.5} />
          <Path d="M8 11V8a4 4 0 1 1 8 0v3" />
        </>
      );
    case 'send':
      return (
        <>
          <Path d="M21 3 10.5 13.5" />
          <Path d="M21 3l-6.8 18-3.7-7.5L3 9.8 21 3Z" />
        </>
      );
    case 'pin':
      return (
        <>
          <Path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" />
          <Circle cx={12} cy={10} r={2.5} />
        </>
      );
    case 'briefcase':
      return (
        <>
          <Rect x={3} y={7.5} width={18} height={12.5} rx={2.5} />
          <Path d="M9 7.5V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1.5" />
          <Path d="M3 13h18" />
        </>
      );
  }
}

type IconProps = {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
};

export default function Icon({ name, size = 22, color = colors.brand, strokeWidth = 1.7 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <G
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {content(name)}
      </G>
    </Svg>
  );
}
