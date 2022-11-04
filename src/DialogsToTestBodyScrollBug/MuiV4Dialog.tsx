import { Dialog as MuiV4Dialog, DialogTitle, Button, DialogActions } from '@material-ui/core';
import { IDialogState } from './useDialogState';

interface Props {
  dialogState: IDialogState;
}

export const MuiV4DemoDialog: React.FC<Props> = (props) => {
  const { dialogState, children } = props;
  return (
    <MuiV4Dialog open={dialogState.dialogIsOpen} onClose={dialogState.closeDialog}>
      <DialogTitle>{children}</DialogTitle>
      <DialogActions>
        <Button onClick={dialogState.closeDialog}>Close</Button>
      </DialogActions>
    </MuiV4Dialog>
  );
};
