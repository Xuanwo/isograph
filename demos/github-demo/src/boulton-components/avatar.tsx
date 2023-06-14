import { bDeclare } from "@isograph/react";
import { ResolverParameterType as AvatarProps } from "./__isograph/User__avatar.isograph";
import { Avatar, Box } from "@mui/material";

export const avatar = bDeclare<AvatarProps, ReturnType<typeof Avatar>>`
  User.avatar @component {
    id,
    name,
    avatarUrl,
  }
`(AvatarComponent);

function AvatarComponent(props: AvatarProps) {
  return <Avatar alt={props.data.name ?? ""} src={props.data.avatarUrl} />;
}
