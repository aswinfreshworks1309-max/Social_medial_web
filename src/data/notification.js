import {Heart, MessageCircle, UserPlus,Bell} from 'lucide-react' 

export const notifications = [
  {
    id: 1,
    type: "like",
    user: "Sarah Jenkins",
    content: "liked your post",
    time: "2m ago",
    icon: Heart ,
  },
  {
    id: 2,
    type: "comment",
    user: "Michael Chen",
    content: 'commented: "This looks amazing! 🔥"',
    time: "15m ago",
    icon: MessageCircle,
  },
  {
    id: 3,
    type: "follow",
    user: "Elena Rodriguez",
    content: "started following you",
    time: "1h ago",
    icon: UserPlus,
  },
  {
    id: 4,
    type: "mention",
    user: "David Smith",
    content: "mentioned you in a comment",
    time: "3h ago",
    icon: Bell ,
  },
];
