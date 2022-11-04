import { Dialog as MuiV5Dialog, DialogTitle, Button, DialogActions } from '@mui/material';
import { IDialogState } from './useDialogState';

interface Props {
  dialogState: IDialogState;
}

export const MuiV5DemoDialog: React.FC<Props> = (props) => {
  const { dialogState, children } = props;
  return (
    <MuiV5Dialog open={dialogState.dialogIsOpen} onClose={dialogState.closeDialog}>
      <DialogTitle>{children}</DialogTitle>
      <DialogActions>
        <Button onClick={dialogState.closeDialog}>Close</Button>
      </DialogActions>
    </MuiV5Dialog>
  );
};
