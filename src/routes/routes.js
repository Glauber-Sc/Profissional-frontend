import React from 'react'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import paths from '../constants/paths'
import { Home, Login, Products, Register, Cart, Admin, OrderTracking} from '../containers'
import PrivateRoute from './private-route'

function Routes() {
  return (
    <Router>
      <Switch>
        <Route component={Login} path={paths.Login} />
        <Route component={Register} path={paths.Register} />
        <PrivateRoute exact component={Home} path={paths.Home} />
        <PrivateRoute component={Products} path={paths.Products} />
        <PrivateRoute component={Cart} path={paths.Cart} />
        <PrivateRoute component={OrderTracking} path={paths.OrderTracking} />

        <PrivateRoute component={Admin} path={paths.Order} isAdmin />
        <PrivateRoute component={Admin} path={paths.ProductsList} isAdmin />
        <PrivateRoute component={Admin} path={paths.NewProduct} isAdmin />
        <PrivateRoute component={Admin} path={paths.EditProduct} isAdmin />
        <PrivateRoute component={Admin} path={paths.Categories} isAdmin />
        <PrivateRoute component={Admin} path={paths.NewCategory} isAdmin />
        <PrivateRoute component={Admin} path={paths.EditCategory} isAdmin />
        <PrivateRoute component={Admin} path={paths.Financial} isAdmin />
      </Switch>
    </Router>
  )
}

export default Routes
