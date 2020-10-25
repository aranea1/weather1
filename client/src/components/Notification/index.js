import { notification } from 'antd';

export const openNotification = (message) => {
  notification.open({
    message: 'Notification.',
    description: message,
    placement: "bottomRight",
    duration: 3
  });
};
