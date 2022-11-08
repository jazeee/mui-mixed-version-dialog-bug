import { createTheme as createThemeV4, ThemeProvider as ThemeProviderV4 } from "@material-ui/core";
import { createTheme as createThemeV5, ThemeProvider as ThemeProviderV5 } from "@mui/material";
import { DialogsToTestBodyScrollBug } from "DialogsToTestBodyScrollBug";

const themeV4 = createThemeV4({
  props: {
    MuiModal: {
      // disableScrollLock: true,
    },
    MuiDialog: {
      scroll: 'body',
      TransitionProps: { role: 'none' } as any,
    },
  },
})

const themeV5 = createThemeV5({
  components: {
    MuiModal: {
      // defaultProps: {
      //   disableScrollLock: true,
      // }
    },
    MuiDialog: {
      defaultProps: {
        scroll: 'body',
        TransitionProps: { role: 'none' } as any,
      }
    },
  }
})

export function App() {
  return (
    <ThemeProviderV4 theme={themeV4}>
      <ThemeProviderV5 theme={themeV5}>
        <DialogsToTestBodyScrollBug />
      </ThemeProviderV5>
    </ThemeProviderV4>
  )
}
