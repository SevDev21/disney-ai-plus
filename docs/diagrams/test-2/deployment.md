# Deployment View

[Open in PlantUML](https://uml.shafie.org/uml/JT0xJWGn30RWFgUmfbbeu0giTXi4nOejg9s9PzPI7gFOORH2At47RiX9C3EyYZJvyzkViZbocYB1Onavm_4iIWa-tjuXq1JBEL5M28nZnGIYpRlD5ZmAzn2NXgoDeLHeGXMmwSawtADooJ2pdc0Wr5P9G5f_0fJbPSP4jnEApAK6UC78OQdSE7SdYbLRYavPpRR_e-o_ALSBcmUcSErSBe6WsyNI0ZpHQ5CwU7K0w_r3yxQEr02xs8nRr_GdtnxkuL12zoN3YVybp-H_avcy9HSxvaJx0eBWtSMqb8DPFm40)

_Source: [ArchAiTect Workbench project](https://docs.shafie.org/projects/test-2/)_

![Deployment View](https://uml.shafie.org/png/JT0xJWGn30RWFgUmfbbeu0giTXi4nOejg9s9PzPI7gFOORH2At47RiX9C3EyYZJvyzkViZbocYB1Onavm_4iIWa-tjuXq1JBEL5M28nZnGIYpRlD5ZmAzn2NXgoDeLHeGXMmwSawtADooJ2pdc0Wr5P9G5f_0fJbPSP4jnEApAK6UC78OQdSE7SdYbLRYavPpRR_e-o_ALSBcmUcSErSBe6WsyNI0ZpHQ5CwU7K0w_r3yxQEr02xs8nRr_GdtnxkuL12zoN3YVybp-H_avcy9HSxvaJx0eBWtSMqb8DPFm40)

```plantuml
'Simple Login System – deployment diagram stub
'A basic login system for user authentication with features such as username/password validation.

@startuml
title Deployment Diagram (Simplified)

node "Cloud Region" {
  node "Kubernetes Cluster" {
    node "API Pod" as api
    node "Web Pod" as web
  }
  database db
}

@enduml
```

## Requirements

- The deployment model shall include a node api representing API Pod, and infrastructure tasks must ensure it is provisioned, monitored, and reachable by its peers.
- The deployment model shall include a node web representing Web Pod, and infrastructure tasks must ensure it is provisioned, monitored, and reachable by its peers.
