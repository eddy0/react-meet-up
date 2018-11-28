import * as React from 'react'
import { connect } from 'react-redux'
import { StoreState } from '../reducer';
import { actionAddTodo, actionToggleTodo } from '../action/todoAction'
import { Todo } from '../model/model';

interface ITestProps {
  todos: Todo[],
  actionAddTodo: (todo:Todo) => void,
  actionToggleTodo: (id:string) => void
}

class Test extends React.Component<ITestProps> {

  input = React.createRef<HTMLInputElement>()

  handleaddTodo = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(this.input.current)
    if (this.input.current !== null) {
      let value = this.input.current.value 
      const todo:Todo = {
        id: Math.random().toString(32).substring(2, 15) + Date.now().toString(32).substring(2, 15),
        task: value,
        complete: false,
      }
      this.props.actionAddTodo(todo)
    }
  }

  render() {
    console.log(this.props)
    return <div>
      <form onSubmit={this.handleaddTodo}>
        <input type="text" ref={this.input} /> 
        <button type='submit'>add todo</button>
      </form>
      {this.props.todos.map((todo) => {
        return <li key={todo.id} style={{color: todo.complete? 'red': ''}}>
          {todo.task}
          <div>
            <button onClick={() => this.props.actionToggleTodo(todo.id)} >toggle</button>
          </div>
        </li>
      })}
    </div>
  }
}

const mapStateToProps = ({todos}: StoreState) => {
  return {
    todos,
  }
}

const mapDispatchToProps = {
  actionAddTodo, 
  actionToggleTodo,
}


export default connect(mapStateToProps, mapDispatchToProps)(Test)
