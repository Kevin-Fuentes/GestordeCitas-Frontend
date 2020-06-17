import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import clienteAxios from "./config/axios";
import Pacientes from "./components/Pacientes";
import NuevaCita from "./components/NuevaCita";
import Cita from "./components/Cita";

function App() {
  const [citas, setcitas] = useState([]);
  const [consulta, setconsulta] = useState(true);

  useEffect(() => {
    if (consulta) {
      const consultarApi = () => {
        clienteAxios
          .get("/pacientes")
          .then((respuesta) => {
            setcitas(respuesta.data);
            setconsulta(false);
          })
          .catch((error) => {
            console.log(error);
          });
      };
      consultarApi();
    }
  }, [consulta]);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={() => <Pacientes citas={citas} />} />

        <Route
          exact
          path="/nueva"
          component={() => <NuevaCita setconsulta={setconsulta} />}
        />

        <Route
          exact
          path="/cita/:id"
          render={(props) => {
            const cita = citas.filter(
              (cita) => cita._id === props.match.params.id
            );

            return <Cita cita={cita[0]} setconsulta={setconsulta} />;
          }}
        />
      </Switch>
    </Router>
  );
}

export default App;
