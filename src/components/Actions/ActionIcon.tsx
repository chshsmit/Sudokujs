/**
 * ActionIcon.tsx
 * @author Christopher Smith
 * @description
 * @created 2020-10-21T14:20:58.321Z-07:00
 * @copyright
 * @last-modified 2020-10-21T14:46:10.413Z-07:00
 */

import React from "react";
import { Grid, IconButton, Tooltip } from "@material-ui/core";

interface ActionIconProps {
  actionText: string;
  icon: React.ReactElement;
  active?: boolean;
  action: any;
}

const ActionIcon = ({
  actionText,
  icon,
  active = true,
  action,
}: ActionIconProps): React.ReactElement => {
  return (
    <Grid item>
      <Tooltip title={actionText}>
        <IconButton onClick={action} disabled={!active}>
          {icon}
        </IconButton>
      </Tooltip>
    </Grid>
  );
};

export default ActionIcon;
