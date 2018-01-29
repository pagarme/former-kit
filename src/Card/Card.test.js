import React from 'react'
import { shallow } from 'enzyme'
import {
  Card,
  CardTitle,
  CardContent,
  CardGraphic,
  CardActions,
} from './index'
import Button from './../Button'

describe('Card', () => {
  it('should mount', () => {
    shallow(
      <Card>
        <CardContent>
          Yeah
        </CardContent>
      </Card>
    )
  })

  it('should mount with title', () => {
    shallow(
      <Card>
        <CardTitle title="Something Good">
          Something
        </CardTitle>
      </Card>
    )
  })

  it('should mount with title and content', () => {
    shallow(
      <Card>
        <CardTitle
          title="Something Good"
        />
        <CardContent>
          Something
        </CardContent>
      </Card>
    )
  })

  it('should mount with title, content, graphics', () => {
    shallow(
      <Card>
        <CardTitle title="something" />
        <CardGraphic>Something</CardGraphic>
        <CardContent>Cool Content</CardContent>
      </Card>
    )
  })

  it('should mount with actions', () => {
    shallow(
      <Card>
        <CardTitle title="something" />
        <CardGraphic>Something</CardGraphic>
        <CardContent>Cool Content</CardContent>
        <CardActions>
          <Button>
            Action 1
          </Button>

          <Button>
            Action 2
          </Button>
        </CardActions>
      </Card>
    )
  })

  it('should call onClick', () => {
    const onClick = jest.fn()

    const component = shallow(
      <Card>
        <CardTitle title="something" onClick={onClick} />
        <CardContent>Cool Content</CardContent>
      </Card>
    )

    component.find(CardTitle).simulate('click')
    component.find(CardTitle).simulate('click')
    component.find(CardTitle).simulate('click')

    expect(onClick).toHaveBeenCalledTimes(3)
  })
})

