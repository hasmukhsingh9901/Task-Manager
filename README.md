1\. What was the hardest part to build? How did you approach it?

The hardest part to build was the task status update system—especially ensuring that tasks could move between different states (like To Do, In Progress, and Completed) smoothly and in real-time on the UI.

Challenges I faced:

Managing state updates dynamically without causing unnecessary re-renders.

Keeping the UI in sync with the task state, especially when multiple tasks were being added, updated, or removed.

Ensuring clean component structure and avoiding prop-drilling.

2\. What tradeoffs did you make and why?

While building the Task Manager, I had to balance feature complexity with development time.

I chose to implement essential features like task creation, status update, and deletion, but skipped advanced features like drag-and-drop, recurring tasks, or calendar integrations to meet the timeline.

3\. If you had 2 more hours, what would you improve?

With 2 extra hours, I would:

Add local storage or backend integration (if not already done) so that tasks persist after page reloads.

Implement a filter/sort feature for better task organization (e.g., sort by due date or filter by status).

Polish the UI/UX more—animations, hover effects, and empty state designs for a more complete user experience.

Add basic validation and toast messages for better error handling and feedback.

4\. If you used AI tools (e.g., ChatGPT, Copilot), explain how you used them and why.

Yes, I used AI tools to enhance efficiency: GitHub Copilot was helpful in speeding up repetitive code like input handling, map rendering for task lists, and writing utility functions.

5\. What decisions did you make beyond the suggestions?

Designed the UI with mobile responsiveness in mind, ensuring it works across screen sizes.

Created a modular folder structure for better code readability and scalability.
