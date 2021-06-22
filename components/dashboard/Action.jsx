import { Tooltip, Button } from '@chakra-ui/react'

const Action = ({ label, icon, onClick, isLast, color }) => (
  <Tooltip hasArrow label={label}>
    <Button onClick={onClick} mr={isLast ? 0 : 3} colorScheme={color}>
      {icon}
    </Button>
  </Tooltip>
)

export default Action
