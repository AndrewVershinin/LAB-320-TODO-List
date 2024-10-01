import React, { useState } from 'react';

const TodoItem = ({ todo, dispatch }) => {
    const [editValue, setEditValue] = useState(todo.task);

    const handleSave = () => {
        dispatch({ type: 'SAVE_TODO', id: todo.id, payload: editValue });
    };

    return (
        <li className={todo.isComplete ? 'complete' : ''}>
            {!todo.isEditing ? (
                <>
                    <input
                        type="checkbox"
                        checked={todo.isComplete}
                        onChange={() => dispatch({ type: 'TOGGLE_COMPLETE', id: todo.id })}
                    />
                    <span>{todo.task}</span>
                    <div className="todo-actions">
                    <button
                        onClick={() => dispatch({ type: 'EDIT_TODO', id: todo.id })}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => dispatch({ type: 'DELETE_TODO', id: todo.id })}
                        disabled={!todo.isComplete}
                    >
                        Delete
                    </button>
                    </div>
                </>
            ) : (
                <>
                    <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                    />
                    <button onClick={handleSave}>Save</button>
                </>
            )}
        </li>
    );
};

export default TodoItem;