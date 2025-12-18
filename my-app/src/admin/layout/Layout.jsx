// import React, { useState } from "react";
// import Sidebar from "../components/Sidebar";
// import TopNavbar from "../components/TopNavbar";
// import styles from "./Layout.module.css";

// import { Outlet } from "react-router-dom";

// function Layout({ children }) {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//   return (
//     <div className={isSidebarOpen ? styles.layout : styles.layoutCollapsed}>
//       <Sidebar
//         isOpen={isSidebarOpen}
//         onToggle={(state) => setIsSidebarOpen(state)}
//       />

//       <div className={styles.mainArea}>
//         <TopNavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

//         <div className={styles.contentWrapper}>{children}</div>
//       </div>
//     </div>
//   );
// }

// export default Layout;

import React, { useState, Suspense } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import styles from "./Layout.module.css";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className={isSidebarOpen ? styles.layout : styles.layoutCollapsed}>
      <Sidebar isOpen={isSidebarOpen} onToggle={setIsSidebarOpen} />

      <div className={styles.mainArea}>
        <TopNavbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        <div className={styles.contentWrapper}>
          <Suspense fallback={<div>Loading page...</div>}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default Layout;
