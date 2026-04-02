/**
 * Contact Form Submission via Supabase
 */

const initContactForm = () => {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const btn = document.getElementById("submit-btn");
  const status = document.getElementById("form-status");
  let client = null;

  try {
    const url = "https://vzrrwbzthpbbfkmbifne.supabase.co";
    const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6cnJ3Ynp0aHBiYmZrbWJpZm5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0ODgyNzgsImV4cCI6MjA4OTA2NDI3OH0.rHBYIw8KrUXPAcBA2zYFI3RCcBO-apA5Jms8hmbFFL8";
    if (window.supabase) client = window.supabase.createClient(url, key);
  } catch (e) {
    console.error("Supabase Init Error:", e);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!client) {
      status.textContent = "Service unavailable. Please try again later.";
      return;
    }

    const originalText = btn.innerHTML;
    btn.innerHTML = "<span>Sending...</span>";
    btn.style.opacity = "0.7";
    btn.style.pointerEvents = "none";

    const formData = {
      name: document.getElementById("sender-name").value,
      email: document.getElementById("sender-email").value,
      message: document.getElementById("sender-message").value,
    };

    try {
      const { error } = await client.from("messages").insert([formData]);
      if (error) throw error;
      status.textContent = "Success! I'll get back to you soon.";
      status.className = "form-status success";
      form.reset();
    } catch (err) {
      status.textContent = "Error sending message. Please check your connection.";
      status.className = "form-status error";
    } finally {
      btn.innerHTML = originalText;
      btn.style.opacity = "1";
      btn.style.pointerEvents = "auto";
      setTimeout(() => {
        status.textContent = "";
        status.className = "form-status";
      }, 5000);
    }
  });
};
