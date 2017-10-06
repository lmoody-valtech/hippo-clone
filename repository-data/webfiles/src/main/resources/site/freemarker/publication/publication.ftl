<#assign hst=JspTaglibs["http://www.hippoecm.org/jsp/hst/core"] />
<#assign fmt=JspTaglibs ["http://java.sun.com/jsp/jstl/fmt"] />
<#assign dateFormat="h:mm a d/MM/yyyy"/>
<html>
<head>
</head>
<body>
<#if document??>
    <h1 id="title">${document.title?html}</h1>
    <div id="taxonomy">
        <h4>Taxonomy:</h4>
        <#list document.keys as key>
            ${key?html},
        </#list>
    </div>
    <div id="nominal-date">
        <h4>Nominal publication date:</h4>
        <@fmt.formatDate value=document.nominalDate.time type="Date" pattern=dateFormat />
    </div>
    <div id="information-types">
        <h4>Information types:</h4>
        <#list document.informationType as type>
            ${type?html},
        </#list>
    </div>
    <div id="summary">
        <h4>Summary:</h4>
        ${document.summary?html}
    </div>
    <div id="key-facts">
        <h4>Key facts:</h4>
        ${document.keyFacts?html}
    </div>
    <div id="coverage-start">
        <h4>Coverage start:</h4>
        <@fmt.formatDate value=document.coverageStart.time type="Date" pattern=dateFormat />
    </div>
    <div id="coverage-end">
        <h4>Coverage end:</h4>
        <@fmt.formatDate value=document.coverageEnd.time type="Date" pattern=dateFormat />
    </div>
    <div id="geographic-coverage">
        <h4>Geographic coverage:</h4>
        ${document.geographicCoverage?html}
    </div>
    <div id="granularity">
        <h4>Granularity:</h4>
        <#list document.granularity as granularityItem>
            ${granularityItem?html},
        </#list>
    </div>
    <div id="attachments">
        <h4>Attachments:</h4>
        <#if document.attachments?has_content>
            <ul>
            <#list document.attachments as attachment>
                <li><a href="<@hst.link hippobean=attachment/>">${attachment.filename}</a></li>
            </#list>
            </ul>
        <#else>
            (No attachments)
        </#if>
    </div>
    <div id="related-links">
        <h4>Related Links:</h4>
        <#if document.relatedLinks?has_content >
            <ul>
                <#list document.relatedLinks as link>
                    <#if link.linkText?has_content>
                        <#assign linkText=link.linkText/>
                    <#else>
                        <#assign linkText=link.linkUrl/>
                    </#if>
                    <li><a href="${link.linkUrl}">${linkText}</a></li>
                </#list>
            </ul>
        <#else>
            <p>(None)</p>
        </#if>
    </div>
    <div id="administrative-sources">
        <h4>Administrative sources:</h4>
        ${document.administrativeSources?html}
    </div>
<#else>
      <h1>No publication</h1>
</#if>
</body>
</html>