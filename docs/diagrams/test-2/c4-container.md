# C4 Container

[Open in PlantUML](https://uml.shafie.org/uml/NL3DIWCn4BxdASQzj0Mnbnv5-kD1eKXjgpsMsMJQ1dQJ9JDnAIBu3hwXJs8sYufUmkJxcNpv1XjRDnN1qX-jWysPXMhuVFy0FTbhxmIjem36uZ5W3IonL8CPbCXMGvKzt7iEFa3afCKe9t9YDOhr3beh9pWGIWp4m56V03ah7TOqRf2vzS702rRMPCkLKbCM31BhIbrOfwje2AuNa_5YibzyPxfHIgoav3y8F5jgbUh_i9_xw0o6yx3FTmb5JnGZU5NmwngsL2PoHoNCcgP8uppuDiNhnbbLfJcdPH0FrWa5r5AC_gp0ndRYrNtdkTjkLtbDv4GovvhqFuVfthn5mTGaTUhDutByuDEPB-Axib8Tc7nlQarL7xD_w8c94zwX6SZBreI6nxjW9PDgIiwa0hy0)

![C4 Container](https://uml.shafie.org/png/NL3DIWCn4BxdASQzj0Mnbnv5-kD1eKXjgpsMsMJQ1dQJ9JDnAIBu3hwXJs8sYufUmkJxcNpv1XjRDnN1qX-jWysPXMhuVFy0FTbhxmIjem36uZ5W3IonL8CPbCXMGvKzt7iEFa3afCKe9t9YDOhr3beh9pWGIWp4m56V03ah7TOqRf2vzS702rRMPCkLKbCM31BhIbrOfwje2AuNa_5YibzyPxfHIgoav3y8F5jgbUh_i9_xw0o6yx3FTmb5JnGZU5NmwngsL2PoHoNCcgP8uppuDiNhnbbLfJcdPH0FrWa5r5AC_gp0ndRYrNtdkTjkLtbDv4GovvhqFuVfthn5mTGaTUhDutByuDEPB-Axib8Tc7nlQarL7xD_w8c94zwX6SZBreI6nxjW9PDgIiwa0hy0)

## Requirements

- The design shall define a container web named Web App (Browser), and implementation work must provision it as a distinct deployable or conceptual element.
- The design shall define a container api named API (HTTP), and implementation work must provision it as a distinct deployable or conceptual element.
- The design shall define a container db named Database (SQL/NoSQL), and implementation work must provision it as a distinct deployable or conceptual element.
- The architecture shall include a relationship where web uses api; this connection must be implemented with appropriate protocols, security, monitoring, and error handling.
- The architecture shall include a relationship where api reads/writes db; this connection must be implemented with appropriate protocols, security, monitoring, and error handling.

```plantuml
'Simple Login System – c4_container diagram stub
'A basic login system for user authentication with features such as username/password validation.

@startuml
!include <C4/C4_Container>

title Container View

System_Boundary(system, "System") {
  Container(web, "Web App", "Browser", "Allows users to interact")
  Container(api, "API", "HTTP", "Business logic")
  Container(db, "Database", "SQL/NoSQL", "Stores data")
}
Rel(web, api, "Uses")
Rel(api, db, "Reads/Writes")

@enduml
```

---

_Source: generated from [ArchAiTect Workbench](https://workbench.shafie.org/projects/test-2/)_
