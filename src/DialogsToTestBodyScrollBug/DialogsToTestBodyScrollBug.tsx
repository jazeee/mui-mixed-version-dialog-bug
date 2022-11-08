import {
  Typography,
  Button,
  Link,
  Alert,
  Box,
  Grid,
  Stack,
  Container,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { MuiV4DemoDialog } from './MuiV4Dialog';
import { MuiV5DemoDialog } from './MuiV5Dialog';
import { useDialogState } from './useDialogState';

export const DialogsToTestBodyScrollBug = () => {
  const firstMuiV4DialogState = useDialogState();
  const secondMuiV4DialogState = useDialogState();
  const firstMuiV5DialogState = useDialogState();
  const secondMuiV5DialogState = useDialogState();
  const [bodyOverflowStyleDetails, setBodyOverflowStyleDetails] = useState<string>(
    document.body.style.overflow
  );

  const aDialogIsOpen = [
    firstMuiV4DialogState,
    secondMuiV4DialogState,
    firstMuiV5DialogState,
    secondMuiV5DialogState,
  ].some((dialogState) => dialogState.dialogIsOpen);

  // Valid states are `aDialogIsOpen xnor bodyOverflowStyleDetails`
  const bodyOverflowIsValid = aDialogIsOpen
    ? Boolean(bodyOverflowStyleDetails)
    : !bodyOverflowStyleDetails;

  function updateLatestBodyOverflowStyle() {
    setBodyOverflowStyleDetails(document.body.style.overflow);
  }

  useEffect(() => {
    // React doesn't know when `body.style` changes. Use this interval to keep local state in sync.
    const intervalId = setInterval(updateLatestBodyOverflowStyle, 100);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const SCENARIOS = [
    {
      description: 'Open MuiV4 Dialog, then MuiV4',
      dialogStates: [firstMuiV4DialogState, secondMuiV4DialogState],
    },
    {
      description: 'Open MuiV4 Dialog, then MuiV5',
      dialogStates: [firstMuiV4DialogState, secondMuiV5DialogState],
    },
    {
      description: 'Open MuiV5 Dialog, then MuiV4',
      dialogStates: [firstMuiV5DialogState, secondMuiV4DialogState],
    },
    {
      description: 'Open MuiV5 Dialog, then MuiV5',
      dialogStates: [firstMuiV5DialogState, secondMuiV5DialogState],
    },
  ];

  return (
    <Container maxWidth="md">
      <Typography paragraph variant="h3" component="h1">Demo of Mixed Mui version Dialog bug</Typography>
      <Typography variant="body1" paragraph>
        This page is a testing area for a bug related to mixing `MuiV4` and `MuiV5` dialogs that
        open in succession.
      </Typography>
      <Typography variant="body1" paragraph>
        When mixing `MuiV4` and `MuiV5` dialogs, `MaterialUI` can break
        `document.body.style.overflow`, and block scrolling.
      </Typography>
      <Typography variant="body1" paragraph>
        The root cause of this issue is that Material `ModalManager` maintains the `document.body`
        `style` state so that it can restore it after closing a modal element, such as a `Dialog`.
      </Typography>
      <Typography variant="body1" paragraph>
        <Link href="https://github.com/mui/material-ui/blob/6b9970e6071a807590fa4c5306526a5e4ceb22e6/packages/mui-base/src/ModalUnstyled/ModalManager.ts#L89-L162">
          Material UI Code Link
        </Link>
      </Typography>
      <Typography variant="body1" paragraph>
        The issue we observed will occur for any scenario where we close, then open MuiV4 / MuiV5
        modal elements at the same time. Each version of `Mui` maintains its own closure of the body
        overflow state, and restores them.
      </Typography>
      <Typography variant="body1" paragraph>
        This issue can only happen when we do the operations simultaneously, but it is not limited
        to Dialogs, it affects any MUI modal element.
      </Typography>
      <Typography variant="body1" paragraph>Once the state is messed up, it needs to be manually cleared.</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Stack spacing={2} alignItems="flex-start">
            {SCENARIOS.map((scenario) => {
              const { description, dialogStates } = scenario;
              return (
                <Button
                  key={description}
                  variant="contained"
                  size="large"
                  onClick={() => {
                    dialogStates[0].openDialog();
                    setTimeout(() => {
                      dialogStates[0].closeDialog();
                      setTimeout(() => {
                        dialogStates[1].openDialog();
                      },
                        /**
                         * waiting before opening the next dialog does also fix the bug, but
                         * this delay appears to be dependent on Dialog animation.
                         * Values of 190 msec or above works - intermittently
                         */
                        0
                      );
                      setTimeout(() => {
                        dialogStates[1].closeDialog();
                      }, 2000);
                    }, 1000);
                  }}
                >
                  {description}
                </Button>
              );
            })}
          </Stack>
        </Grid>
        <Grid item xs={6}>
          <Typography paragraph variant="h4" component="p">
            Status
          </Typography>
          <Typography variant="body1" paragraph>Body Overflow Style: {bodyOverflowStyleDetails || 'N/A'}</Typography>
          {!bodyOverflowIsValid && (
            <Alert severity="error">
              The Body Overflow Style is invalid
            </Alert>
          )}
          <Button
            onClick={() => {
              document.body.style.overflow = '';
            }}
            variant="outlined"
          >
            Reset `document.body` `overflow`
          </Button>
        </Grid>
      </Grid>
      <Box margin={4} />
      <Box paddingX={2} paddingTop={2} paddingBottom="200%" border="5px dashed red">
        <Typography variant="body1">This should be scrollable when the dialogs are closed</Typography>
      </Box>
      <MuiV4DemoDialog dialogState={firstMuiV4DialogState}>
        <Typography variant="body1">First MuiV4 Dialog. This will auto close in 1 second.</Typography>
      </MuiV4DemoDialog>
      <MuiV4DemoDialog dialogState={secondMuiV4DialogState}>
        <Typography variant="body1">Second MuiV4 Dialog. This will auto close in 2 seconds.</Typography>
      </MuiV4DemoDialog>
      <MuiV5DemoDialog dialogState={firstMuiV5DialogState}>
        <Typography variant="body1">First MuiV5 Dialog. This will auto close in 1 second.</Typography>
      </MuiV5DemoDialog>
      <MuiV5DemoDialog dialogState={secondMuiV5DialogState}>
        <Typography variant="body1">Second MuiV5 Dialog. This will auto close in 2 seconds.</Typography>
      </MuiV5DemoDialog>
    </Container>
  );
};
