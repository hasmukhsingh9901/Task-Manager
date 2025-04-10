# Task Manager - Retrospective

## 1. What was the hardest part to build? How did you approach it?

The hardest part to build was the **task status update system**—especially ensuring that tasks could move between different states (like *To Do*, *In Progress*, and *Completed*) smoothly and in real-time on the UI.

### Challenges Faced:
- Managing **state updates** dynamically without causing unnecessary re-renders.
- Keeping the **UI in sync with the task state**, especially when multiple tasks were being added, updated, or removed.
- Ensuring **clean component structure** and avoiding prop-drilling.

### Approach:
- Created a **centralized task store** with all task operations (add, delete, updateStatus) handled in one place.
- Implemented **pure functions** for business logic outside the UI.
- Followed a **component-based structure** to ensure separation of concerns.
- Used debugging tools like **console logs** and **breakpoints** to trace state flow and catch issues early.

---

## 2. What tradeoffs did you make and why?

While building the Task Manager, I had to balance **feature complexity** with **development time**.

- I chose to implement **essential features** like task creation, status update, and deletion.
- Skipped **advanced features** like drag-and-drop, recurring tasks, or calendar integrations to meet the deadline.

These tradeoffs helped me focus on shipping a clean and functional MVP.

---

## 3. If you had 2 more hours, what would you improve?

With 2 extra hours, I would:

- Add **local storage** or **backend integration** so that tasks persist after page reloads.
- Implement a **filter/sort feature** for better task organization (e.g., sort by due date or filter by status).
- Polish the **UI/UX** more—animations, hover effects, and better empty state designs.
- Add **basic validation** and **toast notifications** for improved error handling and user feedback.

---

## 4. If you used AI tools (e.g., ChatGPT, Copilot), explain how you used them and why.

Yes, I used AI tools to enhance efficiency:

- **GitHub Copilot** helped in speeding up repetitive code tasks like input handling, mapping tasks to UI components, and writing utility functions.
- These tools reduced development time, improved productivity, and offered alternative suggestions to solve common coding problems.

---

## 5. What decisions did you make beyond the suggestions?

- Designed the UI with **mobile responsiveness** in mind to ensure accessibility across screen sizes.
- Created a **modular folder structure** for better code readability and long-term scalability.
- Focused on writing **clean, maintainable code** that can be easily extended later.

These decisions were guided by my development experience and a desire to maintain high standards beyond AI-generated suggestions.

---
