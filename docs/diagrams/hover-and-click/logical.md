# Logical View

[Open in PlantUML](https://uml.shafie.org/uml/SoWkIImgAStDuIh9BCb9LV39JyzCJinHq5TmoSzDpCnJ2CjCBUVYIiv9B2vM22rEBLAevb9GqCvC0P6fG1KvNBLSN5mEgNafG4C0)

![Logical View diagram](images/logical-diagram.png)

## Requirements

- This diagram defines the primary elements and relationships for Logical View, and implementation must ensure that all shown components, connections, and responsibilities are realized in code, configuration, and infrastructure.
- The development team shall treat each visual element as either a deployable artifact, a runtime capability, or an integration point, and create tasks to build, configure, and test each of them.
- Non-functional requirements (performance, security, observability, resilience) must be applied to all links and components shown in the diagram.

```plantuml
@startuml
title Logical / Domain View

class User {
  +id
  +email
}


@enduml
```

---

_Source: generated from [ArchAiTect Workbench](https://workbench.shafie.org/projects/hover-and-click/)_
