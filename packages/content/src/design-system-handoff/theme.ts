/**
 * Theme de MUI — Design System Correo Argentino
 * ------------------------------------------------------------------
 * Generado desde Figma "Design System" (kOuwVxF91lktyHh1DSVuAr), 2026-11-04.
 * Fuente: variables locales (Primitive, Semantic, Specific, Typography,
 * Radius, Spacing) y componentes de la página "🎨 Documentación" (13:37).
 *
 * El design system es de todo Correo, pero los botones difieren por plataforma
 * (confirmado por UX, 2026-11-04):
 *   - Web pública MiCorreo → Buttons v1.0 (pill, Secondary amarillo, Tertiary link)
 *   - Backoffices          → Buttons 2.0  (radio 8, Secondary navy, Tertiary azul + dark/light)
 * El resto del theme es compartido.
 *
 * Uso:
 *   import { ThemeProvider, CssBaseline } from '@mui/material';
 *   import { themeWeb } from './theme';          // MiCorreo
 *   import { themeBackoffice } from './theme';   // backoffices
 *   <ThemeProvider theme={themeWeb}><CssBaseline />...</ThemeProvider>
 *
 * Compatible con MUI v5.14+, v6 y v7 (usa styleOverrides con callbacks).
 * No fue compilado contra el repo de producción: revisar con el equipo antes
 * de reemplazar el theme actual (ver README.md → "Cómo adoptarlo").
 *
 * Convenciones de este archivo:
 *   // FIGMA: <nodo o variable>   → de dónde sale el valor
 *   // ⚠ PENDIENTE: ...            → Figma no lo define o es inconsistente
 */
import * as React from 'react';
import { createTheme } from '@mui/material/styles';

/* ------------------------------------------------------------------ */
/* 1. Tokens primitivos (espejo de tokens.json)                       */
/* ------------------------------------------------------------------ */
export const tokens = {
  primary: { 50: '#FFFAE6', 75: '#FFF6D1', 100: '#FFF0B0', 200: '#FFE88A', 300: '#FFDE54', 400: '#FFD833', 500: '#FFCE00', 600: '#E8BB00', 700: '#B59200', 800: '#8C7100', 900: '#6B5700' },
  secondary: { 50: '#E8E9EF', 100: '#B6BCCF', 200: '#939BB7', 300: '#626E96', 400: '#445182', 500: '#152663', 600: '#13235A', 700: '#0F1B46', 800: '#0C1536', 900: '#09102A' },
  neutral: { 0: '#FFFFFF', 50: '#FAFAFA', 75: '#F2F2F2', 100: '#D9D9D9', 200: '#A7A7A7', 300: '#656565', 400: '#474747', 500: '#191919', 600: '#171717', 700: '#121212', 800: '#0E0E0E', 900: '#0B0B0B' },
  error: { 50: '#FEEAEA', 75: '#FFD0D0', 100: '#FABFBF', 200: '#F8A0A0', 300: '#F57575', 400: '#F35A5A', 500: '#F03131', 600: '#DA2D2D', 700: '#AA2323', 800: '#841B1B', 900: '#651515' },
  success: { 50: '#EAF7EF', 75: '#D1E7DD', 100: '#BDDBCA', 200: '#9DC9B0', 300: '#70B18C', 400: '#55A176', 500: '#2A8A54', 600: '#267E4C', 700: '#1E623C', 800: '#174C2E', 900: '#123A23' },
  link: { 50: '#E9EFFD', 100: '#BBCEF8', 200: '#9BB7F5', 300: '#6D96F1', 400: '#5181EE', 500: '#2562EA', 600: '#2259D5', 700: '#1A46A6', 800: '#143681', 900: '#102962', accent300: '#2196F3' },
  radius: { sm: 8, md: 16, lg: 24, xl: 32, '2xl': 40, full: 9999 },
  spacing: { 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 32, 8: 40, 9: 48, 10: 56, 11: 64, 12: 72, 13: 80 },
  overlay: 'rgba(25, 25, 25, 0.5)', // FIGMA: Semantic/Background/color-background-overlay #19191980
  // Estados de interacción globales (2026-11-06). Ver ../propuestas/estados-mi-correo-2/spec.md
  state: {
    hoverBackground: '#F2F2F2', // FIGMA: Semantic/Background/color-background-hover → neutral-75
    hoverStroke: '#A7A7A7', // FIGMA: Semantic/Stroke/color-stroke-hover → neutral-200
    selectedStroke: '#152663', // FIGMA: Semantic/Stroke/color-stroke-selected → secondary-500
    // FIGMA: Semantic/Background/color-background-focus → Primitive/Secondary/color-secondary-500-a10 (#00229D al 10 %).
    // Es una capa sobre el fondo del componente: sobre blanco se ve #E6E9F5.
    focusBackground: 'rgba(0, 34, 157, 0.1)',
  },
} as const;

const t = tokens;
const FONT = '"Gilroy", "Helvetica Neue", Arial, sans-serif';

/* ------------------------------------------------------------------ */
/* 2. Extensiones de tipos (TypeScript)                               */
/* ------------------------------------------------------------------ */
declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary'];
    neutral: typeof tokens.neutral;
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary'];
    neutral?: typeof tokens.neutral;
  }
  interface TypographyVariants {
    textLarge: React.CSSProperties;
  }
  interface TypographyVariantsOptions {
    textLarge?: React.CSSProperties;
  }
}
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    textLarge: true;
  }
}
declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true;
  }
  interface ButtonPropsVariantOverrides {
    /** Sólo backoffice — FIGMA Buttons 2.0 → Version=light */
    light: true;
    /** Sólo backoffice — FIGMA Buttons 2.0 → Version=light border */
    lightBorder: true;
    /**
     * Web y backoffice — FIGMA Buttons 2.0 → Version=borderless (navy) o borderless link (color="tertiary", azul).
     * Sin fondo, sin borde y sin padding. Acciones de texto: «Eliminar», «Editar», «Ver desglose».
     */
    borderless: true;
  }
}

/* ------------------------------------------------------------------ */
/* 3. Ícono de checkbox propio (Figma usa cuadrado 16px, radio 4)     */
/* ------------------------------------------------------------------ */
const checkSvg =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath d='M4 8.5l2.5 2.5L12 5.5' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")";
const CheckboxIcon = React.createElement('span', { className: 'ca-checkbox' });
const CheckboxCheckedIcon = React.createElement('span', { className: 'ca-checkbox ca-checkbox--checked' });

/* ------------------------------------------------------------------ */
/* 4. Botones por plataforma                                          */
/* ------------------------------------------------------------------ */
export type Platform = 'web' | 'backoffice';

type BtnOwner = { variant?: string; color?: string };

const buttonBase = (radius: number) => ({
  borderRadius: radius,
  fontWeight: 600,
  fontSize: 16,
  textTransform: 'none' as const,
  boxShadow: 'none',
  whiteSpace: 'nowrap' as const,
  '& .MuiButton-startIcon': { marginLeft: 0, marginRight: 8 },
  '& .MuiButton-endIcon': { marginRight: 0, marginLeft: 8 },
  '&.Mui-focusVisible': { outline: `2px solid ${t.primary[100]}`, outlineOffset: 0 },
});

/** Primary amarillo: igual en ambas plataformas salvo el disabled. */
const primaryContained = (disabledBg: string) => ({
  backgroundColor: t.primary[500], color: t.secondary[500],
  '&:hover': { backgroundColor: t.primary[600], boxShadow: 'none' },
  '&:active': { backgroundColor: t.primary[700] },
  '&.Mui-disabled': { backgroundColor: disabledBg, color: t.neutral[200] },
});

/**
 * WEB MiCorreo — FIGMA: Buttons v1.0 (49:4524)
 *   Primary   → variant="contained" (color="primary")
 *   Secondary → variant="outlined"
 *   Tertiary  → variant="text"
 */
// Estados hover/pressed de la web = valores relevados en producción MiCorreo (2026-11-04),
// ya cargados en Figma (Buttons v1.0). Pressed = ripple de MUI (currentColor ~30 %): se deja el ripple activo.
const PRIMARY_HOVER_PROD = 'rgba(255, 206, 0, 0.6)'; // FIGMA: Buttons/…/button-primary-bakcground-hover → Primitive/color-primary-500-a60
// FIGMA: button-secondary-text-hover → secondary-300. Producción usa #6A78A8 (deriva intencional: reutiliza token y cumple AA).
const SECONDARY_TEXT_HOVER_PROD = t.secondary[300];

/**
 * FIGMA: Buttons 2.0 → Version=borderless / borderless link (2026-11-06). Se usa igual en web y backoffice.
 *   <Button variant="borderless" startIcon={<Trash2 />}>Eliminar artículo</Button>        → navy
 *   <Button variant="borderless" color="tertiary">Editar</Button>                          → azul link
 * Estados con tokens semánticos globales: hover → color-background-hover, focus → color-background-focus.
 */
function borderlessButton(o: BtnOwner) {
  const link = o.color === 'tertiary';
  const fg = link ? t.link[500] : t.secondary[500]; // FIGMA: Text/Link/link text acent · Text/Brand/color-text-secondaryBrand
  return { ...buttonBase(t.radius.sm),
    backgroundColor: 'transparent', color: fg, border: 'none', minWidth: 0,
    '&:hover': { backgroundColor: t.state.hoverBackground, color: link ? t.link[800] : fg }, // FIGMA: link text hover → link-800
    '&.Mui-focusVisible': { outline: 'none', backgroundColor: t.state.focusBackground },
    '&.Mui-disabled': { backgroundColor: 'transparent', color: t.neutral[200] },
  };
}

function webButton(o: BtnOwner) {
  const base = buttonBase(t.radius.full); // pill
  if (o.variant === 'borderless') return borderlessButton(o);
  if (o.variant === 'outlined') return { ...base,
    backgroundColor: t.neutral[0], color: t.secondary[500], border: `2px solid ${t.primary[500]}`, // borde 2px (prod)
    '&:hover': { backgroundColor: t.neutral[0], borderColor: t.primary[500], color: SECONDARY_TEXT_HOVER_PROD },
    '&.Mui-disabled': { backgroundColor: t.neutral[0], borderColor: t.neutral[100], color: t.neutral[200] },
  };
  if (o.variant === 'text') return { ...base,
    // Texto navy con línea amarilla de 1px, separada 2px. ⚠ Figma no cambia entre estados.
    color: t.secondary[500], minWidth: 0, borderRadius: 0,
    textDecoration: 'underline', textDecorationColor: t.primary[500], textDecorationThickness: 1, textUnderlineOffset: 4,
    '&:hover': { backgroundColor: 'transparent', textDecorationColor: t.primary[600] }, // ⚠ PENDIENTE: hover propuesto
    '&.Mui-disabled': { color: t.neutral[200], textDecorationColor: t.neutral[100] }, // ⚠ PENDIENTE: disabled propuesto
  };
  // contained (y cualquier otra combinación) → Primary
  return { ...base,
    backgroundColor: t.primary[500], color: t.secondary[500], border: `2px solid ${t.primary[500]}`, // borde 2px (prod)
    '&:hover': { backgroundColor: PRIMARY_HOVER_PROD, boxShadow: 'none' },
    '&.Mui-disabled': { backgroundColor: t.neutral[100], borderColor: t.neutral[100], color: t.neutral[200] }, // Figma (prod es igual a hover: no se copia)
  };
}

/**
 * BACKOFFICE — FIGMA: Buttons 2.0 (248:870)
 *   Primary      → variant="contained" color="primary"
 *   Secondary    → variant="outlined"
 *   Tertiary     → variant="contained" color="tertiary"
 *   dark         → variant="contained" color="secondary"
 *   light        → variant="light"
 *   light border → variant="lightBorder"
 */
function backofficeButton(o: BtnOwner) {
  const base = buttonBase(t.radius.sm); // 8
  const v = o.variant;
  const c = o.color;
  if (v === 'borderless') return borderlessButton(o);
  if (v === 'contained' && c === 'secondary') return { ...base,
    backgroundColor: t.secondary[500], color: t.neutral[0],
    '&:hover': { backgroundColor: t.secondary[600], boxShadow: 'none' },
    '&:active': { backgroundColor: t.secondary[700] },
    '&.Mui-disabled': { backgroundColor: t.secondary[100], color: t.neutral[0] },
    '&.Mui-focusVisible': { outline: `2px solid ${t.secondary[100]}` },
  };
  if (v === 'contained' && c === 'tertiary') return { ...base,
    backgroundColor: t.link[500], color: t.neutral[0],
    '&:hover': { backgroundColor: t.link[600], boxShadow: 'none' },
    '&:active': { backgroundColor: t.link[700] },
    '&.Mui-disabled': { backgroundColor: t.link[100], color: t.neutral[0] },
    '&.Mui-focusVisible': { outline: `2px solid ${t.link[100]}` },
  };
  if (v === 'outlined') return { ...base,
    backgroundColor: t.neutral[0], color: t.secondary[500], border: `1px solid ${t.secondary[500]}`,
    '&:hover': { backgroundColor: t.neutral[0], borderColor: t.secondary[600] },
    '&:active': { backgroundColor: t.neutral[50], borderColor: t.secondary[700] },
    '&.Mui-disabled': { backgroundColor: t.neutral[100], borderColor: t.neutral[50], color: t.neutral[200] },
  };
  if (v === 'light') return { ...base, // ⚠ Figma no diferencia hover/pressed
    backgroundColor: t.neutral[75], color: t.secondary[500],
    '&:hover': { backgroundColor: t.neutral[75] },
    '&.Mui-disabled': { color: t.neutral[200] },
  };
  if (v === 'lightBorder') return { ...base, // ⚠ Figma no diferencia hover/pressed
    backgroundColor: t.neutral[0], color: t.secondary[500], border: `1px solid ${t.neutral[100]}`,
    '&:hover': { backgroundColor: t.neutral[0] },
    '&.Mui-disabled': { borderColor: t.neutral[50], color: t.neutral[200] },
  };
  // ⚠ variant="text" no existe en Buttons 2.0: se renderiza como Primary.
  return { ...base, ...primaryContained(t.primary[50]) }; // disabled 2.0 = #FFFAE6 (ver INCONSISTENCIAS #3)
}

/* ------------------------------------------------------------------ */
/* 5. Theme                                                           */
/* ------------------------------------------------------------------ */
export function createCorreoTheme(platform: Platform) {
  const buttonStyle = platform === 'web' ? webButton : backofficeButton;
  const webLink = (o: BtnOwner) => platform === 'web' && o.variant === 'text';
  // borderless no lleva padding (FIGMA: padding 0); conserva el alto de cada tamaño.
  const pad = (o: BtnOwner, p: string) => (o.variant === 'borderless' ? 0 : p);
  return createTheme({
  palette: {
    // FIGMA: Primitive/Primary — amarillo de marca. Texto sobre amarillo = azul marino.
    primary: { main: t.primary[500], light: t.primary[300], dark: t.primary[600], contrastText: t.secondary[500] },
    // FIGMA: Primitive/Secondary — azul marino
    secondary: { main: t.secondary[500], light: t.secondary[400], dark: t.secondary[600], contrastText: t.neutral[0] },
    // FIGMA: Buttons 2/Tertiary — azul link
    tertiary: { main: t.link[500], light: t.link[300], dark: t.link[600], contrastText: t.neutral[0] },
    error: { main: t.error[500], light: t.error[300], dark: t.error[700], contrastText: t.neutral[0] },
    success: { main: t.success[500], light: t.success[300], dark: t.success[700], contrastText: t.neutral[0] },
    // FIGMA: Semantic/status/info → Link/color-accent-300
    info: { main: t.link.accent300, contrastText: t.neutral[0] },
    // ⚠ PENDIENTE: Figma no tiene paleta "warning". status/alert usa el amarillo primario.
    warning: { main: t.primary[500], light: t.primary[100], dark: t.primary[700], contrastText: t.neutral[500] },
    text: {
      primary: t.neutral[500], // FIGMA: Text/Body/color-text-primary
      secondary: t.neutral[400], // FIGMA: Text/Body/color-text-secondary
      disabled: t.neutral[200], // FIGMA: Text/Disabled/color-text-disabled
    },
    background: {
      default: t.neutral[50], // FIGMA: Background/color-background-default
      paper: t.neutral[0], // FIGMA: Background/color-background-surface
    },
    divider: t.neutral[200], // FIGMA: Stroke/color-stroke-divider (existe también divider light = #D9D9D9)
    grey: { 50: t.neutral[50], 100: t.neutral[75], 200: t.neutral[100], 300: t.neutral[200], 400: t.neutral[300], 500: t.neutral[400], 600: t.neutral[500], 700: t.neutral[700], 800: t.neutral[800], 900: t.neutral[900] },
    neutral: t.neutral,
    action: {
      // FIGMA: Background/color-background-hover. Lo usan ListItemButton, MenuItem, TableRow y CardActionArea.
      hover: t.state.hoverBackground,
      // FIGMA: Background/color-background-focus. MUI lo aplica en .Mui-focusVisible de ListItemButton, MenuItem, etc.
      focus: t.state.focusBackground,
      disabled: t.neutral[200],
      disabledBackground: t.neutral[100], // FIGMA: Background/color-background-disabled
    },
  },

  shape: { borderRadius: t.radius.sm }, // FIGMA: radius-sm = 8

  // Figma usa escala de 4px (spacing-1 = 4). Se deja la base de MUI en 8px para
  // no romper código existente: spacing-N de Figma = theme.spacing(N / 2).
  // Si el equipo prefiere 1:1 con Figma, cambiar a `spacing: 4` (impacta todo).
  spacing: 8,

  typography: {
    fontFamily: FONT,
    // FIGMA: sección Tipografía (46:237). No existen como Text Styles en Figma.
    h1: { fontSize: 56, fontWeight: 700, lineHeight: 1.2 },
    h2: { fontSize: 48, fontWeight: 700, lineHeight: 1.2 },
    h3: { fontSize: 40, fontWeight: 700, lineHeight: 1.2 },
    h4: { fontSize: 32, fontWeight: 700, lineHeight: 1.3 },
    h5: { fontSize: 24, fontWeight: 600, lineHeight: 1.4 },
    // ⚠ PENDIENTE: Figma no define h6. Se usa text-large / semi-bold.
    h6: { fontSize: 20, fontWeight: 600, lineHeight: 1.5 },
    textLarge: { fontFamily: FONT, fontSize: 20, fontWeight: 400, lineHeight: 1.5 }, // text-large
    subtitle1: { fontSize: 16, fontWeight: 600, lineHeight: 1.5 }, // text-regular / semi-bold
    subtitle2: { fontSize: 14, fontWeight: 600, lineHeight: 1.5 }, // text-small / semi-bold
    body1: { fontSize: 16, fontWeight: 400, lineHeight: 1.5 }, // text-regular
    body2: { fontSize: 14, fontWeight: 400, lineHeight: 1.5 }, // text-small
    caption: { fontSize: 12, fontWeight: 400, lineHeight: 1.5 },
    overline: { fontSize: 10, fontWeight: 600, lineHeight: 1.5 }, // font-size-xxs
    button: { fontSize: 16, fontWeight: 600, lineHeight: 1, textTransform: 'none' }, // Buttons 2.0: SemiBold 16
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        // ⚠ La fuente Gilroy es comercial: cargar los @font-face con los archivos con licencia del equipo.
        body: { backgroundColor: t.neutral[50], color: t.neutral[500] },
      },
    },

    /* ---------------- Button — web: Buttons v1.0 (49:4524) · backoffice: Buttons 2.0 (248:870) ---------------- */
    MuiButton: {
      defaultProps: { disableElevation: true, color: 'primary', variant: 'contained' },
      styleOverrides: {
        root: ({ ownerState }) => buttonStyle(ownerState as BtnOwner),
        // FIGMA: Size L/M/S = 48/40/32 de alto. Padding horizontal: v1.0 = 20 en todos; 2.0 = 20/20/16.
        // Tertiary web (variant="text"): padding horizontal 24 en todos los tamaños.
        sizeLarge: ({ ownerState }) => ({ height: 48, padding: pad(ownerState, webLink(ownerState) ? '0 24px' : '0 20px') }),
        sizeMedium: ({ ownerState }) => ({ height: 40, padding: pad(ownerState, webLink(ownerState) ? '0 24px' : '0 20px') }),
        sizeSmall: ({ ownerState }) => ({ height: 32, fontSize: 16, padding: pad(ownerState, webLink(ownerState) ? '0 24px' : platform === 'web' ? '0 20px' : '0 16px') }),
      },
    },

    /* ---------------- Inputs — FIGMA: Text Fields (183:2366) y Select (183:3155) ---------------- */
    MuiTextField: { defaultProps: { variant: 'outlined', size: 'medium' } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4, // ⚠ Figma usa 4px, valor que no existe en la colección Radius
          backgroundColor: t.neutral[0],
          fontSize: 16,
          color: t.neutral[500], // input-text-value
          '& .MuiOutlinedInput-notchedOutline': { borderColor: t.neutral[100], borderWidth: 1 }, // input-stroke-default
          '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: t.state.hoverStroke }, // FIGMA: Stroke/color-stroke-hover
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: t.link.accent300, borderWidth: 1 }, // input-stroke-focus
          '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: t.error[500] }, // input-stroke-error
          '&.Mui-disabled': { backgroundColor: t.neutral[0] },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: t.neutral[100] },
          '&.Mui-disabled .MuiOutlinedInput-input': { color: t.neutral[200], WebkitTextFillColor: t.neutral[200] },
        },
        // Medium = 48px de alto, Small = 40px (Figma). Padding horizontal 10px.
        input: {
          padding: '14.5px 10px',
          '&::placeholder': { color: t.neutral[400], opacity: 1 }, // input-text-placeholder
        },
        inputSizeSmall: { padding: '10.5px 10px' },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: t.neutral[400], // input-text-default
          '&.Mui-focused': { color: t.neutral[400] },
          '&.Mui-error': { color: t.error[500] },
          '&.Mui-disabled': { color: t.neutral[200] },
        },
        // Label flotante 14px (MUI usa 12px por defecto)
        shrink: { transform: 'translate(10px, -9px) scale(0.875)' },
        outlined: { transform: 'translate(10px, 14px) scale(1)', '&.MuiInputLabel-sizeSmall': { transform: 'translate(10px, 10px) scale(1)' } },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: { fontSize: 14, marginLeft: 0, marginTop: 4, color: t.neutral[400], '&.Mui-error': { color: t.error[500] } },
      },
    },
    MuiMenuItem: { styleOverrides: { root: { fontSize: 16, minHeight: 40 } } },

    /* ---------------- Checkbox — FIGMA: Checkbox Version=v2 (231:940) ---------------- */
    MuiCheckbox: {
      defaultProps: { icon: CheckboxIcon, checkedIcon: CheckboxCheckedIcon, disableRipple: true },
      styleOverrides: {
        root: {
          padding: 4,
          '& .ca-checkbox': {
            width: 16, height: 16, borderRadius: 4, boxSizing: 'border-box',
            backgroundColor: t.neutral[50], border: `1px solid ${t.neutral[100]}`, // checkBox-*-default
          },
          '& .ca-checkbox--checked': {
            backgroundColor: t.secondary[500], borderColor: t.secondary[500], // checkBox-background-active
            backgroundImage: checkSvg, backgroundSize: 'contain',
          },
          '&.Mui-disabled .ca-checkbox': { backgroundColor: t.neutral[100], borderColor: t.neutral[50] },
          '&.Mui-focusVisible .ca-checkbox': { outline: `2px solid ${t.link.accent300}`, outlineOffset: 1 },
        },
      },
    },

    /* ---------------- Radio — FIGMA: Radio buttons (231:829), 24px con círculo de 20 ---------------- */
    MuiRadio: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          padding: 4,
          color: t.neutral[100], // radioButton-background-default
          '&.Mui-checked': { color: t.secondary[500] }, // radioButton-background-active
          '&.Mui-disabled': { color: t.neutral[100] },
        },
      },
    },

    /* ---------------- Switch — FIGMA: Switch (35:262), 49×24 ---------------- */
    MuiSwitch: {
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: { width: 49, height: 24, padding: 0 },
        switchBase: {
          padding: 4,
          '&.Mui-checked': {
            transform: 'translateX(25px)',
            color: t.neutral[0],
            '& + .MuiSwitch-track': { backgroundColor: t.success[500], opacity: 1 }, // switch-background-active
          },
        },
        thumb: { width: 16, height: 16, boxShadow: 'none', color: t.neutral[0] }, // switch-icon-default
        track: { borderRadius: 12, backgroundColor: t.neutral[100], opacity: 1 }, // switch-background-default
      },
    },

    /* ---------------- Tabs — FIGMA: Tabs (151:721) / Tabs-individual (151:709) ---------------- */
    MuiTabs: {
      styleOverrides: {
        root: { minHeight: 48, borderBottom: `1px solid ${t.neutral[100]}` },
        indicator: { display: 'none' }, // la pestaña activa se marca con fondo amarillo
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: 48, minWidth: 0, padding: 16, fontSize: 16, fontWeight: 400, lineHeight: 1,
          textTransform: 'none', color: t.secondary[500],
          borderRadius: `${t.radius.sm}px ${t.radius.sm}px 0 0`,
          '&.Mui-selected': { backgroundColor: t.primary[500], color: t.neutral[500], fontWeight: 600 }, // tabs-background-active
          '&.Mui-disabled': { backgroundColor: t.neutral[100], color: t.neutral[200] }, // tabs-background-disabled
        },
      },
    },

    /* ---------------- Chip — FIGMA: Chip (1669:1565) ----------------
     * Standard activo   → <Chip variant="filled"   color="secondary" />
     * Standard inactivo → <Chip variant="outlined" />
     * light activo      → <Chip variant="outlined" color="secondary" />
     * light inactivo    → <Chip variant="outlined" />
     */
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: t.radius.full, fontSize: 14, fontWeight: 500, height: 36, padding: '0 6px' },
        sizeSmall: { height: 32, fontSize: 12 },
        filled: ({ ownerState }) => (ownerState.color === 'secondary' ? { fontWeight: 600 } : {}),
        outlined: ({ ownerState }) => ({
          backgroundColor: t.neutral[0],
          borderColor: ownerState.color === 'secondary' ? t.secondary[500] : t.neutral[100],
          color: t.secondary[500],
        }),
      },
    },

    /* ---------------- Tooltip — FIGMA: tooltip V1 PROD (772:1566) ---------------- */
    MuiTooltip: {
      styleOverrides: {
        tooltip: { backgroundColor: '#292929', color: t.neutral[0], fontSize: 12, fontWeight: 400, padding: '6px 8px', borderRadius: 2 }, // ⚠ #292929 no es token
        arrow: { color: '#292929' },
      },
    },

    /* ---------------- Dialog — FIGMA: modal (1029:1400) ---------------- */
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: t.radius.lg, backgroundColor: t.neutral[50], boxShadow: 'none', border: '1px solid rgba(0,0,0,0.18)' },
      },
    },
    MuiBackdrop: { styleOverrides: { root: { '&:not(.MuiBackdrop-invisible)': { backgroundColor: tokens.overlay } } } },
    MuiDialogTitle: { styleOverrides: { root: { fontSize: 24, fontWeight: 700 } } }, // mobile: 20 / Medium
    MuiDialogContentText: { styleOverrides: { root: { fontSize: 16, fontWeight: 500, color: t.neutral[500] } } },

    /* ---------------- AppBar — FIGMA: Header-base (367:3397) ---------------- */
    MuiAppBar: {
      defaultProps: { elevation: 0, color: 'primary' },
      styleOverrides: { root: { color: t.neutral[500] } },
    },
    MuiToolbar: { styleOverrides: { root: { minHeight: 60, '@media (min-width: 1024px)': { minHeight: 80 } } } },

    /* ---------------- Tabla — FIGMA: Componente tablas (367:2110) ---------------- */
    MuiTablePagination: {
      styleOverrides: {
        root: { fontSize: 12, borderTop: `1px solid ${t.neutral[100]}` },
        toolbar: { padding: '0 24px', minHeight: 45 },
        selectLabel: { fontSize: 12 },
        displayedRows: { fontSize: 12 },
      },
    },
    MuiTableCell: { styleOverrides: { root: { borderColor: t.neutral[100] } } },

    /* ---------------- Sidebar — FIGMA: Opciones sideBar, Menú lateral 2.0 (696:1110) ---------------- */
    MuiListItemButton: {
      styleOverrides: {
        root: {
          minHeight: 52, padding: 16, gap: 12, borderRadius: t.radius.sm, fontSize: 16, fontWeight: 600,
          '&.Mui-selected, &.Mui-selected:hover': { backgroundColor: t.secondary[500], color: t.neutral[0] },
        },
      },
    },
  },
  });
}

/** Web pública MiCorreo (Buttons v1.0). */
export const themeWeb = createCorreoTheme('web');
/** Backoffices (Buttons 2.0). */
export const themeBackoffice = createCorreoTheme('backoffice');
