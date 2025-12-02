# C4 Context

[Open in PlantUML](https://uml.shafie.org/uml/FOuzJWD138Lxdy9iao0HQBP4A6WRcaW8HDfec36x5lCJZRr9wBW3D-GaE1gWilril_SjjXoeu8RK1QSEjqn7glZz-OM-t_cIbKwAWTrONKBH-HKMzoWVefHG9wVeOYn7mLce2ch1WpbW-lChRqWd5kKysiQYx79VClh8_lqiwaJf6c0jwghEAS85Pn_dG7Wxz3T3lnkCmN6cUWUWh97mkQKF3GxWqP9BNfu9hh1xiT9TGZjQDbAJsznPzy3Zj8fqe8Y1n5VUAvTiBqyKVqt-lynCR0Dhoi7WVW00)

![C4 Context diagram](images/c4-context-diagram.png)

## Requirements

- The design shall define a person user named User, and implementation work must provision it as a distinct deployable or conceptual element.
- The design shall define a system system named System (High-level description), and implementation work must provision it as a distinct deployable or conceptual element.
- The architecture shall include a relationship where user uses system, and this connection must be implemented with appropriate protocols, security, and error handling.
- The development team shall treat each visual element as either a deployable artifact, a runtime capability, or an integration point, and create tasks to build, configure, and test each of them.
- Non-functional requirements (performance, security, observability, resilience) must be applied to all links and components shown in the diagram.

```plantuml
'Video Metadata Viewer – c4_context diagram stub
'A system that allows users to view metadata of existing videos upon clicking them.

@startuml
!include <C4/C4_Container>

title System Context

Person(user, "User")
System(system, "System", "High-level description")
Rel(user, system, "Uses")

@enduml
```

---

_Source: generated from [ArchAiTect Workbench](https://workbench.shafie.org/projects/hover-and-click/)_
