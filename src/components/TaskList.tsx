import Checkbox from '@mui/material/Checkbox'
import RadioButtonUncheckedOutlinedIcon from '@mui/icons-material/RadioButtonUncheckedOutlined'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import FormControlLabel from '@mui/material/FormControlLabel'
import { MdDeleteOutline } from 'react-icons/md'

import styles from './TaskList.module.css'

interface TaskListProps {
  deleteTask: (id: number) => void
  taskId: number
  taskContent: string
  taskStatus: boolean
  toggleTaskStatus: (id: number) => void
}

export function TaskList({
  deleteTask,
  taskId,
  taskContent,
  taskStatus,
  toggleTaskStatus
}: TaskListProps) {
  return (
    <li className={styles.task}>
      <FormControlLabel
        control={
          <Checkbox
            icon={
              <RadioButtonUncheckedOutlinedIcon
                className={styles.uncheckedIcon}
              />
            }
            checkedIcon={<CheckCircleIcon className={styles.checkedIcon} />}
            checked={taskStatus}
            onClick={() => toggleTaskStatus(taskId)}
          />
        }
        label={taskContent}
        className={taskStatus ? styles.labelChecked : ''}
      />
      <button type="button" onClick={() => deleteTask(taskId)}>
        <MdDeleteOutline size={24} className={styles.trashIcon} />
      </button>
    </li>
  )
}
