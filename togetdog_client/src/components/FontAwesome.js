// 라이브러리
import { library } from "@fortawesome/fontawesome-svg-core";
// 사용할 아이콘 import
import { faDog, faHospital } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { faCompass } from "@fortawesome/free-solid-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import {
  faHouse,
  faMagnifyingGlass,
  faBell,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  faUserGroup,
  faClock,
  faLocationDot,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCalendar,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { faImage, faPen } from "@fortawesome/free-solid-svg-icons";

// 사용할 아이콘을 라이브러리에 추가
library.add(faDog, faUser, faCommentDots, faCompass, faHome);
library.add(faHouse, faMagnifyingGlass, faBell, faSquarePlus);
library.add(faPlus);
library.add(faUserGroup, faClock, faLocationDot);
library.add(faCalendar, faChevronLeft, faChevronRight);
library.add(faImage, faPen);
library.add(faArrowLeft);
