Here’s a refined and polished version of your write-up, formatted for clarity and professionalism while retaining all technical depth:

---

# 7 Solutions Frontend Assignment

## Folder Structure: Feature-Sliced Design Inspired

The project structure follows the [Feature-Sliced Design (FSD)](https://feature-sliced.design/) methodology, promoting **modularity**, **scalability**, and **maintainability** across features and layers.

---

## Core Features & Logic

### 1. Auto-Deleting List (`useAutoDeleteList` Hook)

This custom hook manages a dynamic list where items can be temporarily moved to "Fruit" or "Vegetable" columns and are automatically returned to the main list after a delay.

#### Key Mechanics:

1. **State Management**:

   - Manages three lists: `mainList`, `fruitColumn`, and `vegetableColumn` via `useState`.

2. **Item Movement**:

   - `handleMoveToColumn` moves an item from the main list to a target column based on its `type`, then triggers a timer via `startTimerForItem`.

3. **Timer Control**:

   - `startTimerForItem`:
     - Clears any existing timer (`clearTimerForItem`) for that item to avoid duplicates.
     - Starts a new `setTimeout` for `MOVE_BACK_DELAY_MS` (5 seconds) to call `handleMoveBackToList`.
     - Timer IDs are stored in a `useRef` object (`timerRefs`) for persistence across renders without triggering re-renders.

4. **Return Logic**:

   - `handleMoveBackToList` is called either automatically (via timer) or manually (on user click).
   - It removes the item from the current column, adds it back to `mainList`, and clears the associated timer.

5. **Cleanup on Unmount**:

   - A `useEffect` with an empty dependency array cleans up all timers on component unmount to avoid memory leaks.

#### Why `useRef` for Timers?

- It allows mutable references that persist across renders **without** causing re-renders.
- Using `useState` would trigger re-renders unnecessarily on each timer update.

---

### 2. User Data Aggregation (`transformUserData` Function)

This utility transforms an array of `User` objects into aggregated department-level statistics.

#### How It Works:

- Groups users by their `department`.
- Computes total user count, average age, and other summary statistics.

#### Why `Map` is Used:

- **Efficient Lookups:** O(1) access time for reads/writes.
- **Clear Intent:** Built-in methods (`get`, `set`, `has`) enhance code readability over plain objects.
- **Dynamic Keys:** Handles runtime-generated keys (department names) reliably.

> **Note:** A plain object (`{}`) would also suffice here, but `Map` provides slightly cleaner semantics and consistent performance for large datasets.

---

## Potential Improvements

1. **UX Enhancement:**

   - Add visual feedback (e.g., countdown, fade-out) to inform users when an item will be removed from the column.

2. **Performance Optimization:**

   - Use [`useTransition`](https://react.dev/reference/react/useTransition) to keep the UI responsive during list transitions, especially for large datasets.

3. **Test Coverage:**

   - Unit tests are included for `transformUserData` to ensure correctness and reliability.
