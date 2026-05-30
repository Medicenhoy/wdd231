document.addEventListener("DOMContentLoaded", () => {
  
  const timestampField = document.getElementById("form-timestamp");
  if (timestampField) {
      timestampField.value = Date.now();
  }


  const openButtons = document.querySelectorAll(".open-modal-btn");
  const closeButtons = document.querySelectorAll(".close-modal-btn");
  const allModals = document.querySelectorAll(".benefit-modal");


  openButtons.forEach(button => {
      button.addEventListener("click", () => {
          
          const modalId = button.getAttribute("data-modal");
          const modal = document.getElementById(modalId);
          if (modal) {
              modal.showModal(); 
          }
      });
  });

  closeButtons.forEach(button => {
      button.addEventListener("click", () => {
          const modal = button.closest("dialog");
          if (modal) {
              modal.close(); 
          }
      });
  });

  allModals.forEach(modal => {
      modal.addEventListener("click", (e) => {
          if (e.target === modal) {
              modal.close();
          }
      });
  });

});